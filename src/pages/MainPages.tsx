import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/common/Card/Card";
import MessageModal from "../components/common/Modal/MessageModal";
import "./Mainpages.css";
import { useNavigate, useParams } from "react-router-dom";

export type BgColor = "beige" | "blue" | "purple" | "green";

interface CardData {
  id: number;
  author: string;
  message: string;
  date: string;
  badge: "other" | "friend" | "coworker" | "family";
  avatarUrl: string;
}

interface ApiMessage {
  id: number;
  sender: string;
  profileImageURL: string;
  relationship: "친구" | "지인" | "동료" | "가족";
  content: string;
  font: "Noto Sans" | "Pretendard" | "나눔명조" | "나눔손글씨 손편지체";
  createdAt: string;
}

interface Recipient {
  id: number;
  name: string;
  backgroundColor: string;
  backgroundImageURL?: string;
}

interface ApiMessageResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiMessage[];
}

const API_BASE = "https://rolling-api.vercel.app/19-6";
const PAGE_SIZE = 6;

const COLOR_MAP: Record<BgColor, string> = {
  beige: "#FFF2CC",
  purple: "#EEDBFF",
  blue: "#CCE5FF",
  green: "#D3F4D1",
};

const relationshipToBadge = (relationship: string): CardData["badge"] => {
  switch (relationship) {
    case "친구":
      return "friend";
    case "지인":
      return "other";
    case "동료":
      return "coworker";
    case "가족":
      return "family";
    default:
      return "other";
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate()
  ).padStart(2, "0")}`;
};

function MainPages() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [messagesData, setMessagesData] = useState<ApiMessage[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bgColor: BgColor =
    recipient?.backgroundColor === "blue" ||
    recipient?.backgroundColor === "purple" ||
    recipient?.backgroundColor === "green" ||
    recipient?.backgroundColor === "beige"
      ? recipient.backgroundColor
      : "beige";

  // ✅ recipient 정보 불러오기
  const fetchRecipient = useCallback(async () => {
    if (!id) return;

    try {
      const res = await axios.get<Recipient>(`${API_BASE}/recipients/${id}/`);
      setRecipient(res.data);
    } catch (err) {
      console.warn("⚠️ 존재하지 않는 recipient입니다:", err);
      setRecipient(null);
    }
  }, [id]);

  // ✅ recipient 메시지 불러오기
  const fetchMessages = useCallback(async () => {
    if (!id) return;
    try {
      const res = await axios.get<ApiMessageResponse>(
        `${API_BASE}/recipients/${id}/messages/`
      );

      // results 배열 추출
      const messagesArray: ApiMessage[] = res.data.results;
      setMessagesData(messagesArray);

      // 첫 페이지 카드 생성
      const firstPage: CardData[] = messagesArray
        .slice(0, PAGE_SIZE)
        .map((msg: ApiMessage) => ({
          id: msg.id,
          author: msg.sender,
          message: msg.content,
          date: formatDate(msg.createdAt),
          badge: relationshipToBadge(msg.relationship),
          avatarUrl: msg.profileImageURL,
        }));

      setCards(firstPage);
      setPage(1);
      setHasMore(messagesArray.length > PAGE_SIZE);
    } catch (err) {
      console.error("메시지 불러오기 실패:", err);
    }
  }, [id]);

  // ✅ 무한스크롤 추가 로딩
  const fetchMoreCards = useCallback(() => {
    const start = page * PAGE_SIZE;
    const nextSlice: CardData[] = messagesData
      .slice(start, start + PAGE_SIZE)
      .map((msg: ApiMessage) => ({
        id: msg.id,
        author: msg.sender,
        message: msg.content,
        date: formatDate(msg.createdAt),
        badge: relationshipToBadge(msg.relationship),
        avatarUrl: msg.profileImageURL,
      }));

    setCards((prev) => [...prev, ...nextSlice]);
    setPage((prev) => prev + 1);
    if (start + PAGE_SIZE >= messagesData.length) setHasMore(false);
  }, [messagesData, page]);

  // ✅ 초기 데이터 로딩
  useEffect(() => {
    fetchRecipient();
    fetchMessages();
  }, [fetchRecipient, fetchMessages]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div
      className="mainpages-container"
      style={{
        backgroundColor: recipient?.backgroundImageURL
          ? "transparent"
          : COLOR_MAP[bgColor],
        backgroundImage: recipient?.backgroundImageURL
          ? `url(${recipient.backgroundImageURL})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflowX: "hidden",
      }}
    >
      <InfiniteScroll
        dataLength={cards.length}
        next={fetchMoreCards}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        className="card-grid"
      >
        <Card
          type="plus"
          onAdd={() => {
            if (id) navigate(`/post/${id}/message`);
            else console.warn("recipient id 없음");
          }}
        />

        {cards
          .slice()
          .sort((a, b) => b.id - a.id)
          .map((card) => (
            <Card
              key={card.id}
              type="normal"
              author={card.author}
              message={card.message}
              date={card.date}
              badge={card.badge}
              avatarUrl={card.avatarUrl}
              onClick={() => {
                setSelectedCard(card);
                setIsModalOpen(true);
              }}
            />
          ))}
      </InfiniteScroll>

      {selectedCard && (
        <MessageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          card={selectedCard}
        />
      )}
    </div>
  );
}

export default MainPages;
