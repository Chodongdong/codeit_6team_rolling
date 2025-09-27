/**
 * ✅ Dropdown 컴포넌트 사용법
 *
 * props:
 * - options: string[]                // 드롭다운에 표시될 옵션 리스트
 * - placeholder?: string             // 아무것도 선택하지 않았을 때 보여줄 기본 텍스트 (기본값: "Placeholder")
 * - error?: string                   // 에러 메시지 (문자열이 주어지면 상태가 "error"로 적용되고 메시지 출력)
 * - disabled?: boolean               // 드롭다운 비활성화 여부 (true면 클릭/선택 불가)
 * - onSelect?: (value: string) => void // 옵션 선택 시 실행할 콜백 함수
 *
 * 상태별 동작:
 * - inactive : 기본 상태
 * - focused  : 드롭다운이 focus된 상태
 * - actived  : 드롭다운이 열려 있는 상태
 * - disabled : 비활성화 상태 (hover/focus 불가)
 * - error    : 에러 상태 (빨간 border 유지, hover 막힘 / focus & 선택 가능)
 *
 * 사용 예시:
 * <Dropdown
 *    options={["Option 1", "Option 2", "Option 3"]}
 *    placeholder="옵션을 선택하세요"
 *    error="필수 항목입니다."
 *    disabled={false}
 *    onSelect={(value) => console.log("선택된 값:", value)}
 * />
 */

import React, { useState } from "react";
import "./Dropdown.css";

import arrowRight from "../../assets/arrow_right.png";
import arrowTop from "../../assets/arrow_top.png";

type DropdownState = "inactive" | "focused" | "actived" | "disabled" | "error";

type DropdownProps = {
  options: string[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Placeholder",
  error,
  disabled = false,
  onSelect,
}) => {
  const [selected, setSelected] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    if (onSelect) onSelect(value);
  };

  // 상태 계산
  let state: DropdownState = "inactive";
  if (error) state = "error";
  else if (disabled) state = "disabled";
  else if (isOpen) state = "actived";
  else if (isFocused) state = "focused";

  // ✅ disabled만 완전히 차단, error는 여전히 인터랙션 가능
  const isInteractive = !disabled;

  return (
    <div className="dropdown-wrapper">
      {/* 선택 박스 */}
      <div
        className={`dropdown dropdown-${state}`}
        tabIndex={isInteractive ? 0 : -1}
        onClick={() => {
          if (isInteractive) setIsOpen((prev) => !prev);
        }}
        onFocus={() => {
          if (isInteractive) setIsFocused(true);
        }}
        onBlur={(e) => {
          if (isInteractive) {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsFocused(false);
              setIsOpen(false);
            }
          }
        }}
      >
        <span className={selected ? "selected" : "placeholder"}>
          {selected || placeholder}
        </span>
        <img
          src={isOpen ? arrowTop : arrowRight}
          alt="arrow"
          className="arrow"
        />
      </div>

      {/* 옵션 리스트 */}
      {isOpen && isInteractive && (
        <div className="dropdown-list">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className={`dropdown-item ${
                opt === selected ? "active-option" : ""
              }`}
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}

      {/* 에러 메시지 */}
      {error && <p className="dropdown-error-text">{error}</p>}
    </div>
  );
};

export default Dropdown;
