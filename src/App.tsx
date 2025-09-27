// app:component
// 사용법 예시: <App />

import React from "react";
import Input from "./components/Input/Input";
import ArrowButton from "./components/ArrowButton/ArrowButton";

const App: React.FC = () => {
  const handleLeftClick = () => {
    console.log("왼쪽 버튼 클릭");
  };

  const handleRightClick = () => {
    console.log("오른쪽 버튼 클릭");
  };

  return (
    <div>
      {/* 일반 인풋 */}
      <Input placeholder="Placeholder" />

      {/* 비활성화 인풋 */}
      <Input placeholder="Placeholder" disabled />

      {/* 화살표 버튼 */}
      <div>
        <ArrowButton direction="left" onClick={handleLeftClick} />
        <ArrowButton direction="right" onClick={handleRightClick} />
      </div>
    </div>
  );
};

export default App;
