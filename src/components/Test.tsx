import React, { useState } from "react";
import Dropdown from "./common/Dropdown"; // 위치 맞게 수정

function Test() {
  const [error, setError] = useState<string | undefined>(
    "필수 선택 항목입니다!"
  );
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div style={{ padding: "40px" }}>
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
        <Dropdown
          options={options}
          placeholder="옵션 선택"
          error={error}
          onErrorClear={() => setError(undefined)} // ✅ 드롭다운 열릴 때 error 제거
        />
      </div>
    </div>
  );
}

export default Test;
