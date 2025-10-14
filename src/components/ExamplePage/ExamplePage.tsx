import { useState } from "react";
import PlusButton from "../common/PlusButton/PlusButton";
import MessageModal from "../common/Modal/MessageModal";

/*
 * ExamplePage 컴포넌트
 * - PlusButton 클릭 시 MessageModal을 열어보는 테스트용 페이지
 * - 상태 관리(useState)를 사용하여 모달 열림/닫힘을 컨트롤
 * - MessageModal에 messageId를 전달하여 API에서 메시지 데이터를 불러올 수 있음
 */

export default function ExamplePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {/* 버튼 클릭 시 모달 열기 */}
      <PlusButton onClick={handleOpenModal} />

      {/* 모달 */}
      <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
