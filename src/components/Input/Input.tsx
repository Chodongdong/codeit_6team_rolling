// input:component
// 사용법 예시: <Input placeholder="입력하세요" disabled={false} />

import React, { useState } from "react";
import type { ChangeEvent } from "react";
import "./Input.css";

// Input 컴포넌트 Props 타입 정의
interface InputProps {
  placeholder?: string; // 안내 텍스트
  disabled?: boolean; // 비활성화 여부
}

const Input: React.FC<InputProps> = ({
  placeholder = "입력하세요",
  disabled = false,
}) => {
  const [value, setValue] = useState<string>(""); // 입력값 상태
  const [isFocused, setIsFocused] = useState<boolean>(false); // 포커스 상태
  const [error, setError] = useState<string>(""); // 에러 메시지 상태

  // 입력값 변경 이벤트
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // 숫자가 입력되면 에러 발생
    if (/^\d+$/.test(inputValue)) {
      setError("Error Message");
    } else {
      setError(""); // 숫자가 아니면 에러 초기화
    }
  };

  // 포커스 시작
  const handleFocus = () => setIsFocused(true);

  // 포커스 종료
  const handleBlur = () => setIsFocused(false);

  // 상태별 클래스 적용
  let inputClass = "input-box inactive"; // 기본 inactive
  if (disabled) inputClass = "input-box disabled"; // 비활성화
  else if (error) inputClass = "input-box error"; // 에러
  else if (isFocused) inputClass = "input-box active"; // 포커스

  return (
    <div>
      {/* 인풋 박스 */}
      <input
        className={inputClass} // 상태별 CSS 클래스 적용
        placeholder={placeholder} // 안내 텍스트
        value={value} // 입력값 바인딩
        onChange={handleChange} // 입력 이벤트 연결
        onFocus={handleFocus} // 포커스 이벤트 연결
        onBlur={handleBlur} // 블러 이벤트 연결
        disabled={disabled} // 비활성화 여부
      />

      {/* 에러 메시지 표시 */}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Input;
