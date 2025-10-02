import React, { useState } from "react";
import Card from "../components/common/Card/Card";

type CardType = {
  id: number;
  type: "normal" | "edit"; // plus는 상태에서 관리하지 않고 항상 마지막에만 렌더링
  author: string;
  badge: "other" | "friend" | "coworker" | "family";
  message: string;
  date: string;
  avatarUrl: string;
};

function CardTestPage() {
  const [cards, setCards] = useState<CardType[]>([
    {
      id: 1,
      type: "normal",
      author: "민서",
      badge: "friend",
      message: "오늘 하루도 화이팅!",
      date: "2025-10-02",
      avatarUrl: "https://i.pravatar.cc/56?u=minseo",
    },
    {
      id: 2,
      type: "edit",
      author: "동현",
      badge: "coworker",
      message: "내일까지 보고서 제출 부탁!",
      date: "2025-10-01",
      avatarUrl: "https://i.pravatar.cc/56?u=donghyeon",
    },
  ]);

  // ✅ 카드 추가
  const handleAdd = () => {
    const newId = cards.length + 1;
    const newCard: CardType = {
      id: newId,
      type: "normal",
      author: `새 카드 ${newId}`,
      badge: "other",
      message: "추가된 카드입니다!",
      date: new Date().toISOString().slice(0, 10),
      avatarUrl: `https://i.pravatar.cc/56?u=${newId}`,
    };
    setCards([...cards, newCard]);
  };

  // ✅ 카드 삭제
  const handleDelete = (id: number) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        justifyContent: "flex-start",
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          type={card.type}
          author={card.author}
          badge={card.badge}
          message={card.message}
          date={card.date}
          avatarUrl={card.avatarUrl}
          onDelete={() => handleDelete(card.id)}
        />
      ))}

      {/* ✅ 항상 마지막에 위치하는 PlusCard */}
      <Card type="plus" onAdd={handleAdd} />
    </div>
  );
}

export default CardTestPage;
