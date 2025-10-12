import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/common/Card/Card";
import Button from "../components/common/buttons/button"; // ✅ 공용 버튼 컴포넌트
import "./Edit.css";

// 카드 타입 정의
interface CardData {
  id: number;
  author: string;
  message: string;
  date: string;
  badge: "other" | "friend" | "coworker" | "family";
  avatarUrl: string;
}

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

interface MainPagesProps {
  initialBgColor?: string;
}

const EditPage: React.FC<MainPagesProps> = ({ initialBgColor = "#FFE2AD" }) => {
  const [cards, setCards] = useState(allCards.slice(0, 6));
  const [hasMore, setHasMore] = useState(true);
  const [bgColor] = useState(initialBgColor);

  const handleDelete = (id: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleDeleteAll = () => {
    setCards([]);
    setHasMore(false);
  };

  const fetchMoreCards = () => {
    const nextIndex = cards.length;
    const moreCards = allCards.slice(nextIndex, nextIndex + 3);
    if (moreCards.length === 0) {
      setHasMore(false);
      return;
    }
    setCards([...cards, ...moreCards]);
  };

  return (
    <div
      className="mainpages-container"
      style={{
        backgroundColor: bgColor,
        minHeight: "100vh",
        transition: "background 0.3s",
        paddingTop: "20px",
      }}
    >
      {/* 전체 삭제 버튼 */}
      <div className="editpage-header">
        <Button
          variant="primary"
          size="sm"
          shape="default"
          onClick={handleDeleteAll}
          className="delete-all-btn"
        >
          삭제하기
        </Button>
      </div>

      <InfiniteScroll
        dataLength={cards.length + 1}
        next={fetchMoreCards}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        className="card-grid"
      >
        {cards
          .slice()
          .sort((a, b) => b.id - a.id)
          .map((card) => (
            <Card
              key={card.id}
              type="edit"
              author={card.author}
              message={card.message}
              date={card.date}
              badge={card.badge}
              avatarUrl={card.avatarUrl}
              onDelete={() => handleDelete(card.id)}
            />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default EditPage;
