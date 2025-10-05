import React from "react";
import Input from "../components/common/Input/Input";
import ArrowButton from "../components/common/ArrowButton/ArrowButton"; // default export
import PlusButton from "../components/common/PlusButton/PlusButton";
import CardList from "../components/common/CardList/CardList";

const App: React.FC = () => {
  const handleLeftClick = () => console.log("왼쪽 버튼 클릭");
  const handleRightClick = () => console.log("오른쪽 버튼 클릭");

  return (
    
    <div style={{ padding: "24px" }}>
    
    <section style={{ marginBottom: "40px" }}>
        <h2>🔥 인기 롤링페이퍼</h2>
        <CardList variant="set1" />
        <CardList variant="set2" />
        <CardList variant="set2" />
        <CardList variant="set2" />
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>✨ 최근에 만든 롤링페이퍼</h2>
        <CardList variant="set2" />
      </section>

      <section>
        <h2>🎁 나의 롤링페이퍼</h2>
        <CardList variant="set3" />
      </section>
  </div>

    
  );
};

export default App;