import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/common/Card/Card";
import MessageModal from "../components/common/Modal/MessageModal";
import "./MainPages.css";

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
  recipientId: number;
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
}

interface MainPagesProps {
  externalBgColor: BgColor;
  recipientName: string;
}

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
  const y = date.getFullYear();
  const m = ("0" + (date.getMonth() + 1)).slice(-2);
  const d = ("0" + date.getDate()).slice(-2);
  return `${y}.${m}.${d}`;
};

const API_BASE = "https://rolling-api.vercel.app/19-6";
const PAGE_SIZE = 6;

const COLOR_MAP: Record<BgColor, string> = {
  beige: "#FFF2CC",
  purple: "#EEDBFF",
  blue: "#CCE5FF",
  green: "#D3F4D1",
};

function MainPages({ externalBgColor, recipientName }: MainPagesProps) {
  const [recipientId, setRecipientId] = useState<number | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [bgColor, setBgColor] = useState<BgColor>(externalBgColor);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [messagesData, setMessagesData] = useState<ApiMessage[]>([]);

  // recipient 조회 또는 생성 (axios 사용)
  const createOrGetRecipient = useCallback(async () => {
    if (!recipientName || recipientName.trim() === "") {
      console.warn("recipientName이 빈 값입니다. 조회/생성을 건너뜁니다.");
      return;
    }

    try {
      // 1) 이름으로 recipient 리스트 조회
      const getRes = await axios.get<Recipient[]>(`${API_BASE}/recipients/`, {
        params: { name: recipientName },
      });

      if (getRes.data.length > 0) {
        setRecipientId(getRes.data[0].id);

        // API에서 받은 배경색이 COLOR_MAP에 있는 색상명인지 확인 후 세팅
        const serverBgColor = getRes.data[0].backgroundColor;
        if (
          serverBgColor === "beige" ||
          serverBgColor === "blue" ||
          serverBgColor === "purple" ||
          serverBgColor === "green"
        ) {
          setBgColor(serverBgColor);
        } else {
          setBgColor(externalBgColor);
        }
        return;
      }

      // 2) 없으면 새로 생성
      const createRes = await axios.post<Recipient>(`${API_BASE}/recipients/`, {
        name: recipientName,
        backgroundColor: externalBgColor,
      });
      setRecipientId(createRes.data.id);
      setBgColor(externalBgColor);
    } catch (error) {
      console.error("recipient 생성/조회 에러:", error);
    }
  }, [externalBgColor, recipientName]);

  // recipient 생성/조회 트리거
  useEffect(() => {
    if (recipientName && recipientName.trim() !== "") {
      createOrGetRecipient();
    } else {
      setRecipientId(null);
      setCards([]);
      setHasMore(false);
    }
  }, [createOrGetRecipient, recipientName]);

  // recipientId가 세팅되면 메시지 불러오기 (axios)
  useEffect(() => {
    if (!recipientId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get<ApiMessage[]>(
          `${API_BASE}/recipients/${recipientId}/messages/`
        );
        const data = res.data;
        setMessagesData(data);

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
        setHasMore(data.length > PAGE_SIZE);
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

  // 배경색 업데이트 PATCH 호출 (axios)
  const updateBackgroundColor = useCallback(
    async (newColor: BgColor) => {
      if (!recipientId) return;

      try {
        console.log("🔧 PATCH 요청 보내는 중:", newColor);
        await axios.patch(`${API_BASE}/recipients/${recipientId}/`, {
          backgroundColor: newColor,
        });
        setBgColor(newColor);
      } catch (err) {
        console.error("배경색 업데이트 실패:", err);
      }
    },
    [recipientId]
  );

  // 서버 배경색과 로컬 bgColor 맞추기
  useEffect(() => {
    const checkAndUpdateBg = async () => {
      if (!recipientId) return;

      try {
        const res = await axios.get<Recipient>(
          `${API_BASE}/recipients/${recipientId}/`
        );
        const serverColor = res.data.backgroundColor;

        if (serverColor !== bgColor) {
          if (
            serverColor === "beige" ||
            serverColor === "blue" ||
            serverColor === "purple" ||
            serverColor === "green"
          ) {
            setBgColor(serverColor);
          } else {
            await updateBackgroundColor(bgColor);
          }
        }
      } catch (err) {
        console.error("배경색 체크 중 에러:", err);
      }
    };

    checkAndUpdateBg();
  }, [recipientId, bgColor, updateBackgroundColor]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  // 디버깅 로그
  console.log("현재 bgColor:", bgColor);
  console.log("매핑된 색상 코드:", COLOR_MAP[bgColor]);

  return (
    <div
      className="mainpages-container"
      style={{
        backgroundColor: COLOR_MAP[bgColor],
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
