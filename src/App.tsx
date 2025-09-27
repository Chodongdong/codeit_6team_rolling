import React from "react";
import Dropdown from "./components/common/Dropdown";

function App() {
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div>
      <h2>실제 인터랙션 테스트</h2>

      <div>
        <p>1. 기본 드롭다운 (inactive → hover/focus/actived 확인 가능)</p>
        <Dropdown options={options} placeholder="기본 드롭다운" />
      </div>

      <div>
        <p>2. Disabled 드롭다운</p>
        <Dropdown options={options} placeholder="비활성화" disabled />
      </div>

      <div>
        <p>3. Error 드롭다운</p>
        <Dropdown options={options} placeholder="에러 발생" error="error" />
      </div>
    </div>
  );
}

export default App;
