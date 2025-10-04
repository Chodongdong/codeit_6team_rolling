import React, { type ComponentPropsWithoutRef } from "react";
import plusIcon from "../../../assets/plus.png";
import "./PlusButton.css";

/**
 * PlusButton 컴포넌트
 *
 * 원형 플러스 버튼을 표시하는 공용 컴포넌트입니다.
 * 사용법 예시:
 * <PlusButton className="custom" onClick={handleClick} />
 */
interface PlusButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: number; // 버튼 크기, 기본값 56px
}

const PlusButton: React.FC<PlusButtonProps> = ({
  size = 56,
  className = "",
  ...props
}) => {
  // CSS 변수로 버튼 크기 적용
  const mergedStyle: React.CSSProperties = {
    "--plus-button-size": `${size}px`,
  } as React.CSSProperties;

  return (
    <button
      className={["plus-button", className].filter(Boolean).join(" ")}
      style={mergedStyle}
      {...props}
    >
      <div className="plus-bg" />
      <img src={plusIcon} alt="plus" className="plus-icon" />
    </button>
  );
};

export default PlusButton;
