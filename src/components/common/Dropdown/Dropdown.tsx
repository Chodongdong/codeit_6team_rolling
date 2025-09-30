/**
 * ✅ Dropdown 컴포넌트 사용법
 *
 * props:
 * - options: string[]                  // 드롭다운에 표시될 옵션 리스트
 * - placeholder?: string               // 선택 전 기본 텍스트 (기본값: "Placeholder")
 * - error?: string                     // 에러 메시지 (있으면 상태 "error"로 표시 + 메시지 출력)
 * - onSelect?: (value: string) => void // 옵션 선택 시 실행되는 콜백
 * - onErrorClear?: () => void          // 드롭다운 열릴 때 에러를 없애는 콜백
 * - className?: string                 // 외부에서 추가 스타일 지정
 * - (기타 button 기본 props)             // disabled, onClick, aria-* 등 button 속성들
 */

import React, { useState } from "react";
import type { ButtonHTMLAttributes } from "react";
import "./Dropdown.css";

import { arrowRight, arrowTop } from "../../../assets";

type DropdownState = "inactive" | "focused" | "actived" | "disabled" | "error";

type DropdownProps = {
  options: string[];
  placeholder?: string;
  error?: string;
  onSelect?: (value: string) => void;
  onErrorClear?: () => void;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

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

function Dropdown({
  options,
  placeholder = "Placeholder",
  error,
  onSelect,
  onErrorClear,
  className = "",
  disabled,
  ...props
}: DropdownProps) {
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isInteractive = !disabled;
  const state = getDropdownState(error, disabled, isOpen, isFocused);

  /** 옵션 선택 시 실행 */
  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onSelect?.(value);
  };

  /** 드롭다운 열기/닫기 토글 */
  const toggleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isInteractive) return;

    const next = !isOpen;
    setIsOpen(next);

    // ✅ 열릴 때 에러 초기화
    if (next) {
      onErrorClear?.();
    }

    props.onClick?.(e);
  };

  return (
    <div className={`dropdown-wrapper ${className}`}>
      {/* 트리거 버튼 */}
      <button
        type="button"
        className={`dropdown dropdown-${state}`}
        disabled={disabled}
        {...props}
        onClick={toggleOpen}
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
          {options.map((opt) => (
            <div
              key={opt}
              className={`dropdown-item ${
                opt === selected ? "active-option" : ""
              }`}
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()} // blur 방지
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
}

export default Dropdown;
