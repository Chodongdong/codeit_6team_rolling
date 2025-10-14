import Badge from "../Badge/Badge";
import Button from "../buttons/button";
import ModalOverlay from "./ModalOverlay";
import "./MessageModal.css";

interface CardData {
  author: string;
  message: string;
  date: string;
  badge: "other" | "friend" | "coworker" | "family";
  avatarUrl: string;
}

interface MessageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  card?: CardData; // 카드 데이터를 직접 전달
}

export default function MessageModal({
  isOpen = false,
  onClose = () => {},
  card,
}: MessageModalProps) {
  if (!card) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="message-modal">
        <div className="modal-header">
          <div className="left">
            <img
              src={card.avatarUrl}
              alt={card.author}
              className="profile-img"
            />
            <div className="info">
              <p className="from">
                From. <span className="name">{card.author}</span>
              </p>
              <Badge variant={card.badge} />
            </div>
          </div>
          <span className="date">{card.date}</span>
        </div>

        <div className="modal-body">
          {/* 읽기 전용 텍스트 표시 */}
          <p className="message-text">{card.message?.replace(/<\/?p>/g, "")}</p>
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
