import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/common/Card/Card";
import MessageModal from "../components/common/Modal/MessageModal";
import "./MainPages.css";

// 배경색 유니온 타입
type BgColor = "#FFE2AD" | "#E0F7FA" | "#F8BBD0" | "#D1C4E9";

// 카드 데이터 타입
interface CardData {
  id: number;
  author: string;
  message: string;
  date: string;
  badge: "other" | "friend" | "coworker" | "family";
  avatarUrl: string;
}

// API 메시지 타입
interface ApiMessage {
  id: number;
  recipientId: number;
  sender: string;
  profileImageURL: string;
  relationship: "친구" | "지인" | "동료" | "가족";
  content: string;
  font: "Noto Sans" | "Pretendard" | "나눔명조" | "나눔손글씨 손편지체";
  createdAt: string;
}

// MainPages 컴포넌트 props 타입
interface MainPagesProps {
  initialBgColor?: BgColor;
  recipientId: number; // 꼭 받아야 함, 메시지 조회할 대상 ID
}

// 관계 문자열 → badge 매핑 함수
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

// 날짜 포맷 함수 (YYYY-MM-DD → YYYY.MM.DD)
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = ("0" + (date.getMonth() + 1)).slice(-2);
  const d = ("0" + date.getDate()).slice(-2);
  return `${y}.${m}.${d}`;
};

const API_BASE = "https://rolling-api.vercel.app/19-6";

const PAGE_SIZE = 6;

function MainPages({
  initialBgColor = "#FFE2AD",
  recipientId,
}: MainPagesProps) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [bgColor, setBgColor] = useState<BgColor>(initialBgColor);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [messagesData, setMessagesData] = useState<ApiMessage[]>([]);

  // 메시지 전체 데이터 한 번만 fetch
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/recipients/${recipientId}/messages/`
        );
        if (!res.ok) {
          throw new Error("메시지 불러오기 실패");
        }
        const data: ApiMessage[] = await res.json();
        setMessagesData(data);
        // 첫 페이지 메시지 세팅
        const initialSlice = data.slice(0, PAGE_SIZE).map((msg) => ({
          id: msg.id,
          author: msg.sender,
          message: msg.content,
          date: formatDate(msg.createdAt),
          badge: relationshipToBadge(msg.relationship),
          avatarUrl: msg.profileImageURL,
        }));
        setCards(initialSlice);
        setPage(1);
        if (data.length <= PAGE_SIZE) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("fetchMessages error:", err);
        setHasMore(false);
      }
    };
    fetchMessages();
  }, [recipientId]);

  // 추가 메시지 불러오기
  const fetchMoreCards = () => {
    const start = page * PAGE_SIZE;
    const nextSlice = messagesData
      .slice(start, start + PAGE_SIZE)
      .map((msg) => ({
        id: msg.id,
        author: msg.sender,
        message: msg.content,
        date: formatDate(msg.createdAt),
        badge: relationshipToBadge(msg.relationship),
        avatarUrl: msg.profileImageURL,
      }));

    setCards((prev) => [...prev, ...nextSlice]);
    setPage((p) => p + 1);

    if (start + PAGE_SIZE >= messagesData.length) {
      setHasMore(false);
    }
  };

  // 배경색 변경 API 호출 함수 (useCallback으로 메모이제이션)
  const updateBackgroundColor = useCallback(
    async (newColor: BgColor) => {
      const bgColorMap: Record<BgColor, string> = {
        "#FFE2AD": "beige",
        "#E0F7FA": "blue",
        "#F8BBD0": "purple",
        "#D1C4E9": "green",
      };

      try {
        const res = await fetch(`${API_BASE}/recipients/${recipientId}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            backgroundColor: bgColorMap[newColor],
          }),
        });
        if (!res.ok) {
          throw new Error("배경색 업데이트 실패");
        }
        setBgColor(newColor); // 실제 배경색 상태 변경
      } catch (err) {
        console.error(err);
      }
    },
    [recipientId]
  );

  // 컴포넌트 마운트 시 초기 배경색으로 API에 업데이트
  useEffect(() => {
    updateBackgroundColor(bgColor);
  }, [bgColor, updateBackgroundColor]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div
      className="mainpages-container"
      style={{
        backgroundColor: bgColor,
        minHeight: "100vh",
        width: "100vw",
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
        <Card type="plus" onAdd={() => console.log("메시지 창으로 이동")} />

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
