import "./Header.css";
import { useState } from "react";
import BadgeEmoji from "../BadgeEmoji/BadgeEmoji";
import Button from "../buttons/button";
import ProfileImage from "../Option/ProfileImage";
import type { HeaderProps } from "./Header.types";

const HeaderService = ({
  recipient = "수취인",
  avatars = [],
  totalWriters = 0,
  reactions = [],
}: HeaderProps) => {
  const [showReactions, setShowReactions] = useState(false); // 공감 확장 팝오버
  const [showShare, setShowShare] = useState(false); // 공유 팝오버

  return (
    <div className="Header service">
      <div className="service__recipient">To. {recipient}</div>

      <div className="service__meta">
        <div className="service__avatars">
          {avatars.slice(0, 3).map((a) => (
            <ProfileImage
              key={a.id}
              src={a.src}
              alt={a.alt ?? "avatar"}
              size={32}
            />
          ))}
          {avatars.length > 3 && (
            <span className="service__avatar-extra">+{avatars.length - 3}</span>
          )}
        </div>

        <div className="service__count">
          {totalWriters}
          <span>명이 작성했어요!</span>
        </div>

        <div className="service__divider">|</div>

        <div className="service__reactions">
          {reactions.slice(0, 3).map((r, i) => (
            <BadgeEmoji key={i} emoji={r.type} count={r.count} />
          ))}
          {reactions.length > 3 && (
            <img
              className="service__reaction-arrow"
              src="assets/arrow_down.svg"
              alt="reactions more"
              onClick={() => setShowReactions((prev) => !prev)}
            />
          )}

          {showReactions && (
            <div className="popover popover--reactions">
              {reactions.map((r, i) => (
                <BadgeEmoji key={i} emoji={r.type} count={r.count} />
              ))}
            </div>
          )}
        </div>

        <div className="service__actions">
          <Button
            variant="outlined"
            size="md"
            shape="icon"
            icon="assets/smile.png"
            children="추가"
          />
          <div className="service__divider">|</div>

          <div className="share-wrapper">
            <Button
              variant="outlined"
              size="md"
              shape="icon"
              icon="assets/share.svg"
              onClick={() => setShowShare((prev) => !prev)}
            />
            {showShare && (
              <div className="popover popover--share">
                <button
                  className="popover__item"
                  onClick={() => alert("카카오톡 공유")}
                >
                  카카오톡 공유
                </button>
                <button
                  className="popover__item"
                  onClick={() =>
                    navigator.clipboard
                      .writeText(window.location.href)
                      .then(() => alert("URL이 복사되었습니다"))
                  }
                >
                  URL 공유
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderService;
