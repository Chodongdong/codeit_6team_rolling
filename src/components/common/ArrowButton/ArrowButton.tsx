import React, { type ComponentPropsWithoutRef } from "react";
import "./ArrowButton.css";
import { arrowIcon } from "../../../assets";

/**
 * ArrowButton 컴포넌트
 *
 * 원형 버튼 안에 화살표 아이콘을 표시하는 공용 버튼 컴포넌트입니다.
 * direction을 "left" 또는 "right"로 지정하여 화살표 방향을 설정할 수 있으며,
 * size props로 버튼 크기를 'default' | 'small' | 'large' 중 하나로 선택할 수 있습니다.
 *
 * 사용법 예시:
 * <ArrowButton direction="left" size="small" onClick={handleClick} />
 * <ArrowButton size="large" className="custom-class" />
 */
interface ArrowButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "style"> {
  direction?: "left" | "right"; // 화살표 방향 지정
  size?: "default" | "small" | "large"; // 버튼 크기 선택
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction = "right",
  size = "default",
  className = "",
  ...props
}) => {
  // 선택된 size에 따라 CSS modifier 클래스 지정
  const sizeClass = `arrow-button--${size}`;

  return (
    <button
      className={["arrow-button", sizeClass, className]
        .filter(Boolean)
        .join(" ")}
      aria-label={props["aria-label"] ?? "arrow-button"} // 접근성용 레이블
      {...props} // onClick 등 이벤트 전달
    >
      {/* 버튼 배경 */}
      <div className="arrow-bg" />
      {/* 화살표 아이콘 */}
      <img
        src={arrowIcon}
        alt="arrow"
        className={`arrow-icon ${direction === "left" ? "rotate-180" : ""}`}
      />
    </button>
  );
};

export default ArrowButton;
