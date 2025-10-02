import { useState, useEffect } from "react";
import Badge from "../Badge/Badge";
import Button from "../buttons/button";
import ModalOverlay from "./ModalOverlay"; // 새로 만든 오버레이
import "./MessageModal.css";
/**
 * MessageModal 컴포넌트
 *
 * 메시지를 확인하고 수정할 수 있는 모달 컴포넌트입니다.
 * - 모달 열림 상태를 isOpen으로 제어
 * - 모달 닫기 이벤트를 onClose로 전달
 * - messageId를 기반으로 API에서 메시지 데이터를 불러옴
 * - 프로필 이미지, 이름, 관계, 날짜, 메시지를 표시
 * - 메시지는 textarea로 수정 가능
 *
 * 사용법 예시:
 * <MessageModal
 *   isOpen={isModalOpen}          // 모달 열림 여부
 *   onClose={handleCloseModal}    // 모달 닫기 콜백
 *   messageId="123"               // 불러올 메시지 ID
 * />
 *
 * 내부 동작:
 * - isOpen이 true이고 messageId가 존재하면 API 호출
 * - fetch된 데이터는 상태로 저장 후 화면에 렌더링
 * - 모달 열림 시 스크롤 잠금은 ModalOverlay에서 처리
 */
interface MessageData {
  profileImg: string;
  name: string;
  relation: "other" | "friend" | "coworker" | "family";
  date: string;
  message: string;
}

interface MessageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  messageId?: string;
}

export default function MessageModal({
  isOpen = false,
  onClose = () => {},
  messageId,
}: MessageModalProps) {
  const [data, setData] = useState<MessageData | null>(null);
  const [message, setMessage] = useState("");

  // API 호출
  useEffect(() => {
    if (!isOpen || !messageId) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/message/${messageId}`);
        const json = await res.json();

        const fetchedData: MessageData = {
          profileImg: json.profileUrl,
          name: json.senderName,
          relation: json.relation,
          date: json.date,
          message: json.message,
        };
        setData(fetchedData);
        setMessage(fetchedData.message);
      } catch (err) {
        console.error("메시지 불러오기 실패", err);
      }
    }

    fetchData();
  }, [isOpen, messageId]);

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="message-modal">
        <div className="modal-header">
          <div className="left">
            <img
              src={data?.profileImg ?? ""}
              alt={data?.name ?? "프로필"}
              className="profile-img"
            />
            <div className="info">
              <p className="from">
                From. <span className="name">{data?.name}</span>
              </p>
              {data?.relation && <Badge variant={data.relation} />}
            </div>
          </div>
          <span className="date">{data?.date}</span>
        </div>

        <div className="modal-body">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요."
            className="message-input"
          />
        </div>

        <div className="modal-footer">
          <Button variant="primary" size="md" shape="default" onClick={onClose}>
            확인
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
}
