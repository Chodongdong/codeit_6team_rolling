import { type ComponentPropsWithoutRef } from "react";
import { plusIcon } from "../../../assets";
import "./PlusButton.css";
/*
 * PlusButton 컴포넌트
 *
 * 원형 플러스 버튼을 렌더링합니다.
 * - 버튼 크기는 size props로 조절 가능 (기본 56px)
 * - onClick props를 전달하면 버튼 클릭 시 외부에서 핸들링 가능
 */

interface PlusButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: number; // 버튼 크기, 기본값 56px
  onClick?: () => void; // 버튼 클릭 시 외부에서 처리 가능
}

const PlusButton = ({
  size = 56,
  className = "",
  onClick,
  ...props
}: PlusButtonProps) => {
  // CSS 변수로 버튼 크기 적용
  const mergedStyle: React.CSSProperties = {
    "--plus-button-size": `${size}px`,
  } as React.CSSProperties;

  return (
    <button
      className={["plus-button", className].filter(Boolean).join(" ")}
      style={mergedStyle}
      onClick={onClick} // 외부에서 전달받은 클릭 핸들러 사용
      {...props}
    >
      <div className="plus-bg" />
      <img src={plusIcon} alt="plus" className="plus-icon" />
    </button>
  );
};

export default PlusButton;
