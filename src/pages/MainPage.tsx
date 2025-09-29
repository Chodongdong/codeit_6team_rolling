import React from "react";
import Input from "../components/Input/Input";
import ArrowButton from "../components/ArrowButton/ArrowButton"; // default export

const App: React.FC = () => {
  const handleLeftClick = () => console.log("왼쪽 버튼 클릭");
  const handleRightClick = () => console.log("오른쪽 버튼 클릭");

  return (
    <div>
      <Input placeholder="Placeholder" />
      <Input placeholder="Placeholder" disabled />

      <div className="flex mt-4">
        <ArrowButton direction="left" onClick={handleLeftClick} />
        <ArrowButton direction="right" onClick={handleRightClick} />
      </div>
    </div>
  );
};

export default App;
