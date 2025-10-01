import { useState, type ComponentPropsWithoutRef } from "react";
import plusIcon from "../../../assets/plus.svg";
import MessageModal from "../Modal/MessageModal";
import "./PlusButton.css";

/**
 * PlusButton 컴포넌트
 *
 * 원형 플러스 버튼을 표시하는 공용 컴포넌트입니다.
 * 클릭 시 MessageModal을 열 수 있습니다.
 */
interface PlusButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: number; // 버튼 크기, 기본값 56px
}

const PlusButton = ({ size = 56, className = "", ...props }: PlusButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // CSS 변수로 버튼 크기 적용
  const mergedStyle: React.CSSProperties = {
    "--plus-button-size": `${size}px`,
  } as React.CSSProperties;

  return (
    <>
      <button
        className={["plus-button", className].filter(Boolean).join(" ")}
        style={mergedStyle}
        onClick={openModal} // 클릭 시 모달 열기
        {...props}
      >
        <div className="plus-bg" />
        <img src={plusIcon} alt="plus" className="plus-icon" />
      </button>

      {/* PlusButton 내부에서 모달 렌더링 */}
      <MessageModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default PlusButton;
