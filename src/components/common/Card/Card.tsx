import Button from "../buttons/button";
import Badge from "../Badge/Badge";
import "./Card.css";
import PlusButton from "../PlusButton/PlusButton";

import trashIcon from "../../../assets/trash.png";

type CardProps = {
  type: "normal" | "edit" | "plus";
  author?: string;
  date?: string;
  message?: string;
  avatarUrl?: string;
  badge?: "other" | "friend" | "coworker" | "family";
  onDelete?: () => void;
  onAdd?: () => void;
  onClick?: () => void; // ✅ 모달을 띄울 onClick 이벤트 추가
};

function Card({
  type,
  author,
  date,
  message,
  avatarUrl,
  badge = "other",
  onDelete,
  onAdd,
  onClick,
}: CardProps) {
  // ✅ PLUS 카드 (새 카드 추가 버튼)
  if (type === "plus") {
    return (
      <div className="card plus-card">
        <PlusButton onClick={onAdd} size={56} />
      </div>
    );
  }

  // ✅ 일반 카드 + 수정 모드 카드
  return (
    <div
      className={`card ${type === "edit" ? "card-edit" : ""}`}
      onClick={onClick} // ✅ 카드 클릭 시 모달창 띄우는 이벤트
      role="button"
      tabIndex={0}
    >
      <div className="card-header">
        {/* 아바타 + 작성자/뱃지 묶음 */}
        <div className="card-user">
          <img
            src={avatarUrl || "/default-avatar.png"}
            alt="avatar"
            className="card-avatar"
          />
          <div className="card-user-info">
            <span className="card-from">
              From. <b>{author}</b>
            </span>
            <Badge variant={badge} className="card-badge" />
          </div>
        </div>

        {/* 삭제 버튼 (edit 전용) */}
        {type === "edit" && (
          <Button
            variant="outlined"
            size="sm"
            shape="trash"
            icon={trashIcon}
            className="delete-btn" // ✅ 스타일용 클래스명 추가
            onClick={(e) => {
              e.stopPropagation(); // ✅ 카드 클릭(onClick)과 충돌 방지
              onDelete?.();
            }}
          />
        )}
      </div>

      {/* 본문 */}
      <div className="card-body">{message?.replace(/<\/?p>/g, "")}</div>

      {/* 날짜 */}
      <div className="card-footer">{date}</div>
    </div>
  );
}

export default Card;
