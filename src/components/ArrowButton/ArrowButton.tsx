/**
 * ArrowButton 컴포넌트
 *
 * 원형 버튼 안에 화살표를 표시하는 공용 컴포넌트입니다.
 * direction을 "left" 또는 "right"로 지정하여 화살표 방향을 설정할 수 있으며,
 * size props로 버튼 크기를 조절할 수 있습니다.
 * className과 ...props를 통해 추가 스타일링과 이벤트 처리가 가능합니다.
 *
 * 사용법:
 * <ArrowButton direction="left" onClick={handleClick} size={72} />
 * <ArrowButton style={{ "--arrow-button-size": "80px" } as React.CSSProperties} />
 */

import React, { type ComponentPropsWithoutRef } from "react";
import "./ArrowButton.css";
import arrowRight from "../../assets/ic/arrow_right.svg";

interface ArrowButtonProps extends ComponentPropsWithoutRef<"button"> {
  direction?: "left" | "right";
  size?: number; // 기본값 56px
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction = "right",
  size = 56,
  className = "",
  style,
  ...props
}) => {
  // CSS 변수로 size 적용
  const mergedStyle: React.CSSProperties = {
    ...style,
    "--arrow-button-size": `${size}px`,
  } as React.CSSProperties;

  return (
    <button
      className={`arrow-button ${className}`}
      style={mergedStyle}
      {...props}
    >
      <div className="arrow-bg" />
      <img
        src={arrowRight}
        alt="arrow"
        className={`arrow-icon ${direction === "left" ? "rotate-180" : ""}`}
      />
    </button>
  );
};

export default ArrowButton;
