import React, { useState, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/common/Card/Card";
import Button from "../components/common/buttons/button";
import "./Edit.css";

// 배경색 유니온 타입 정의
type BgColor = "#FFE2AD" | "#E0F7FA" | "#F8BBD0" | "#D1C4E9";

// 카드 개수 상수
const INITIAL_CARD_COUNT = 6;
const MORE_CARD_COUNT = 3;

// 카드 타입 정의
interface CardData {
  id: number;
  author: string;
  message: string;
  date: string;
  badge: "other" | "friend" | "coworker" | "family";
  avatarUrl: string;
}

// 더미 카드 데이터
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

// Props 인터페이스
interface MainPagesProps {
  initialBgColor?: BgColor;
}

const EditPage: React.FC<MainPagesProps> = ({ initialBgColor = "#FFE2AD" }) => {
  const [cards, setCards] = useState(allCards.slice(0, INITIAL_CARD_COUNT));
  const [hasMore, setHasMore] = useState(true);
  const [bgColor] = useState<BgColor>(initialBgColor);

  // 삭제 핸들러
  const handleDelete = (id: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  // 전체 삭제
  const handleDeleteAll = () => {
    setCards([]);
    setHasMore(false);
  };

  // 더 불러오기
  const fetchMoreCards = () => {
    const nextIndex = cards.length;
    const moreCards = allCards.slice(nextIndex, nextIndex + MORE_CARD_COUNT);

    if (moreCards.length === 0) {
      setHasMore(false);
      return;
    }

    setCards([...cards, ...moreCards]);
  };

  // 정렬된 카드 목록을 메모이제이션
  const sortedCards = useMemo(() => {
    return [...cards].sort((a, b) => b.id - a.id);
  }, [cards]);

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

      {/* 무한 스크롤 카드 목록 */}
      <InfiniteScroll
        dataLength={cards.length + 1}
        next={fetchMoreCards}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        className="card-grid"
      >
        {sortedCards.map((card) => (
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
