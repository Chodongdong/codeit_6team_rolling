/**
 * ✅ Dropdown 컴포넌트 사용법
 *
 * props:
 * - options: string[]                // 드롭다운에 표시될 옵션 리스트
 * - placeholder?: string             // 아무것도 선택하지 않았을 때 보여줄 기본 텍스트 (기본값: "Placeholder")
 * - error?: string                   // 에러 메시지 (문자열이 주어지면 상태가 "error"로 적용되고 메시지 출력)
 * - onSelect?: (value: string) => void // 옵션 선택 시 실행할 콜백 함수
 * - className?: string               // 외부에서 커스텀 스타일 적용 가능
 * - (기타 button 기본 props)           // disabled, onClick, aria-* 등 기본 button 속성들
 */

import React, { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import "./Dropdown.css";

import arrowRight from "../../assets/arrow_right.png";
import arrowTop from "../../assets/arrow_top.png";

type DropdownState = "inactive" | "focused" | "actived" | "disabled" | "error";

type DropdownProps = {
  options: string[];
  placeholder?: string;
  error?: string;
  onSelect?: (value: string) => void;
  className?: string;
} & ComponentPropsWithoutRef<"button">; // button 기본 props 상속

const getDropdownState = (
  error?: string,
  disabled?: boolean,
  isOpen?: boolean,
  isFocused?: boolean
): DropdownState => {
  if (error) return "error";
  if (disabled) return "disabled";
  if (isOpen) return "actived";
  if (isFocused) return "focused";
  return "inactive";
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Placeholder",
  error,
  onSelect,
  className = "",
  ...props
}) => {
  const [selected, setSelected] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    if (onSelect) onSelect(value);
  };

  const state = getDropdownState(error, props.disabled, isOpen, isFocused);
  const isInteractive = !props.disabled;

  return (
    <div className="dropdown-wrapper">
      {/* 트리거 버튼 */}
      <button
        type="button"
        className={`dropdown dropdown-${state} ${className}`}
        {...props} // 여기 안에 disabled 등 기본 button 속성 포함
        onClick={(e) => {
          if (isInteractive) setIsOpen((prev) => !prev);
          props.onClick?.(e);
        }}
        onFocus={(e) => {
          if (isInteractive) setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          if (isInteractive && !e.currentTarget.contains(e.relatedTarget)) {
            setIsFocused(false);
            setIsOpen(false);
          }
          props.onBlur?.(e);
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
      </button>

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
