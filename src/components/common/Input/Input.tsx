import React, { useState, type ChangeEvent } from "react";
import type { ComponentPropsWithoutRef } from "react";
import "./Input.css";

/**
 * Input 컴포넌트
 *
 * 공용 인풋 컴포넌트입니다.
 * - 외부에서 value나 onChange를 직접 관리하지 않고 내부 상태로 관리
 * - className과 ...props를 통해 추가 스타일링 및 속성 전달 가능
 *
 * 사용법 예시:
 * <Input placeholder="이름을 입력하세요" />
 * <Input placeholder="이메일" className="my-custom" />
 */

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder = "입력하세요",
  className = "",
  ...props
}) => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (/\d/.test(inputValue)) {
      setErrorMessage("Error Massage");
    } else {
      setErrorMessage("");
    }
  };

  const inputClass = ["input-box", errorMessage ? "error" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <input
        className={inputClass}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        {...props}
      />
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </div>
  );
};

export default Input;
