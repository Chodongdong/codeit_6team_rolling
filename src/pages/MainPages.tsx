import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/common/Card/Card";
import MessageModal from "../components/common/Modal/MessageModal";
import "./MainPages.css";

export type BgColor = "#FFE2AD" | "#E0F7FA" | "#F8BBD0" | "#D1C4E9";

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
  externalBgColor: BgColor; // 상위 컴포넌트에서 받아온 배경색
  recipientName: string; // 이름으로 recipient 생성 또는 조회
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

const bgColorMap: Record<BgColor, string> = {
  "#FFE2AD": "beige",
  "#E0F7FA": "blue",
  "#F8BBD0": "purple",
  "#D1C4E9": "green",
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

  // recipient 조회 후 없으면 생성하는 함수
  const createOrGetRecipient = useCallback(async () => {
    if (!recipientName || recipientName.trim() === "") {
      console.warn("recipientName이 빈 값입니다. 조회/생성을 건너뜁니다.");
      return;
    }

    try {
      // 1) 이름으로 recipient 리스트 조회
      const getRes = await fetch(
        `${API_BASE}/recipients/?name=${encodeURIComponent(recipientName)}`
      );
      if (!getRes.ok) {
        throw new Error("recipient 조회 실패");
      }
      const recipients: Recipient[] = await getRes.json();

      if (recipients.length > 0) {
        // 이미 있으면 그 id 사용
        setRecipientId(recipients[0].id);
        setBgColor(externalBgColor);
        return;
      }

      // 2) 없으면 새로 생성
      const createRes = await fetch(`${API_BASE}/recipients/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: recipientName,
          backgroundColor: bgColorMap[externalBgColor],
        }),
      });
      if (!createRes.ok) {
        const errorText = await createRes.text();
        throw new Error(
          `recipient 생성 실패: ${createRes.status} ${errorText}`
        );
      }
      const createdRecipient: Recipient = await createRes.json();
      setRecipientId(createdRecipient.id);
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
      // 이름이 없으면 초기화 처리
      setRecipientId(null);
      setCards([]);
      setHasMore(false);
    }
  }, [createOrGetRecipient, recipientName]);

  // recipientId가 세팅되면 메시지 불러오기
  useEffect(() => {
    if (!recipientId) return;

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

  // 배경색 업데이트 PATCH 호출
  const updateBackgroundColor = useCallback(
    async (newColor: BgColor) => {
      if (!recipientId) return;

      try {
        const res = await fetch(`${API_BASE}/recipients/${recipientId}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            backgroundColor: bgColorMap[newColor],
          }),
        });
        if (!res.ok) {
          throw new Error("배경색 업데이트 실패");
        }
        setBgColor(newColor);
      } catch (err) {
        console.error(err);
      }
    },
    [recipientId]
  );

  // externalBgColor 변경시 배경 업데이트
  useEffect(() => {
    if (externalBgColor !== bgColor) {
      updateBackgroundColor(externalBgColor);
    }
  }, [externalBgColor, bgColor, updateBackgroundColor]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div
      className="mainpages-container"
      style={{
        backgroundColor: bgColor,
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
