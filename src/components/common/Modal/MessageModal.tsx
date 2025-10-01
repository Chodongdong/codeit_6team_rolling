import  { useState, useEffect } from "react";
import Badge from "../Badge/Badge";
import Button from "../buttons/button";
import "./MessageModal.css";

/**
 * 메시지 확인용 모달 컴포넌트
 */

interface MessageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  profileImg?: string;
  name?: string;
  relation?: "other" | "friend" | "coworker" | "family";
  date?: string;
  defaultMessage?: string;
}

// React.FC 사용 안 하고 작성
function MessageModal({
  isOpen = false,
  onClose = () => {},
  profileImg = "../../../assets/profile.png",
  name = "홍길동",
  relation = "coworker",
  date = "2025.01.01",
  defaultMessage = "",
}: MessageModalProps) {
  const [message, setMessage] = useState(defaultMessage);


  // 모달 열렸을 때 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // 컴포넌트 언마운트 시 초기화
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="message-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="left">
            <img src={profileImg} alt="프로필" className="profile-img" />
            <div className="info">
              <p className="from">
                From. <span className="name">{name}</span>
              </p>
              <Badge variant={relation} />
            </div>
          </div>
          <span className="date">{date}</span>
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
    </div>
  );
};

export default MessageModal;
