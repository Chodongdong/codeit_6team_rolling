import React from "react";
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
}: CardProps) {
  if (type === "plus") {
    return (
      <div className="card plus-card">
        <PlusButton onClick={onAdd} size={56} />
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        {/* 아바타 + 작성자/뱃지 묶음 */}
        <div className="card-user">
          {avatarUrl && (
            <img
              src={avatarUrl || "/default-avatar.png"}
              alt="avatar"
              className="card-avatar"
            />
          )}
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
            onClick={onDelete}
          />
        )}
      </div>

      {/* 본문 */}
      <div className="card-body">{message}</div>

      {/* 날짜 */}
      <div className="card-footer">{date}</div>
    </div>
  );
}

export default Card;
