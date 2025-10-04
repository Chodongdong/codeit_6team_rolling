import { useEffect } from "react";
import "./ModalOverlay.css";

interface ModalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/*
 * ModalOverlay 컴포넌트
 *
 * 모달 배경과 스크롤 잠금을 처리하는 컴포넌트입니다.
 * - 모달 바깥 클릭 시 onClose 호출
 */

export default function ModalOverlay({
  isOpen,
  onClose,
  children,
}: ModalOverlayProps) {
  // 모달 열림 상태에 따른 스크롤 잠금
  useEffect(() => {
    if (!isOpen) return;

    // body + html 스크롤 잠금
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
