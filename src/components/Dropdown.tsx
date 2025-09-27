import React, { useState } from "react";
import "./Dropdown.css";

import arrowRight from "../assets/arrow_right.png";
import arrowTop from "../assets/arrow_top.png";

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
