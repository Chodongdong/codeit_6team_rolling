import React, { useState } from "react";
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

// MainPages 컴포넌트 props 타입
interface MainPagesProps {
  initialBgColor?: BgColor;
}

// 초기 카드 데이터
const allCards: CardData[] = [
  {
    id: 1,
    author: "김동훈",
    message:
      "코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요!",
    date: "2023.07.08",
    badge: "coworker",
    avatarUrl: "/assets/avatar1.png",
  },
  {
    id: 2,
    author: "김동훈",
    message:
      "코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요!",
    date: "2023.07.08",
    badge: "other",
    avatarUrl: "/assets/avatar2.png",
  },
  {
    id: 3,
    author: "강미나",
    message:
      "코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요!",
    date: "2023.07.08",
    badge: "friend",
    avatarUrl: "/assets/avatar3.png",
  },
  {
    id: 4,
    author: "김동훈",
    message:
      "코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요!",
    date: "2023.07.08",
    badge: "coworker",
    avatarUrl: "/assets/avatar4.png",
  },
  {
    id: 5,
    author: "김동훈",
    message:
      "코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요!",
    date: "2023.07.08",
    badge: "family",
    avatarUrl: "/assets/avatar1.png",
  },
];

function MainPages({ initialBgColor = "#FFE2AD" }: MainPagesProps) {
  const [cards, setCards] = useState<CardData[]>(allCards.slice(0, 6));
  const [hasMore, setHasMore] = useState(true);
  const [bgColor] = useState<BgColor>(initialBgColor);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMoreCards = () => {
    const nextIndex = cards.length;
    const moreCards = allCards.slice(nextIndex, nextIndex + 3);
    if (moreCards.length === 0) {
      setHasMore(false);
      return;
    }
    setCards([...cards, ...moreCards]);
  };

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
        transition: "background 0.3s",
      }}
    >
      <InfiniteScroll
        dataLength={cards.length + 1}
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
