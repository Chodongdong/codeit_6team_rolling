/**
 * 각 페이지에 맞춰 쓸 수 있는 Header 컴포넌트
 *
 * @example
 * // 홈 페이지 (롤링 페이퍼 만들기 버튼만 있음)
 * <Header showCreateButton />
 *
 * @example
 * // 디테일 페이지 (수취인/작성자/리액션 보임)
 * <Header
 * showServiceMeta
 * recipient="Ashley Kim"
 * avatars={[
 *  { id: 1, src: "src/assets/avatar1.png" },
 *  { id: 2, src: "src/assets/avatar2.png" },
 *  { id: 3, src: "src/assets/avatar3.png" },
 *  { id: 4, src: "src/assets/avatar4.png" },
 * ]}
 * totalWriters={23}
 * reactions={[
 *  { type: "thumbsUp", count: 24 },
 *  { type: "love", count: 16 },
 *  { type: "party", count: 10 },
 * ]}
 * />
 *
 */

import "./Header.css";
import Button from "../buttons/button";
import BadgeEmoji from "../BadgeEmoji/BadgeEmoji";
import type { HeaderProps } from "./Header.types";
import ProfileImage from "../Option/ProfileImage";
import { useState } from "react";
const Header = ({
  showCreateButton = false,
  showServiceMeta = false,
  recipient = "수취인",
  avatars = [],
  totalWriters = 0,
  reactions = [],
}: HeaderProps) => {
  const [showReactions, setShowReactions] = useState(false); // 공감 확장 팝오버
  const [showShare, setShowShare] = useState(false); // 공유 팝오버

  return (
    <header className="Header">
      <div className="main">
        <img src="assets/logo.svg" alt="Rolling Logo" />
        {showCreateButton && (
          <Button
            variant="outlined"
            size="md"
            shape="default"
            children="롤링 페이퍼 만들기"
          />
        )}
      </div>

      {showServiceMeta && (
        <div className="service">
          <div className="service__recipient">To. {recipient}</div>
          <div className="service__meta">
            <div className="service__avatars">
              {avatars?.slice(0, 3).map((a) => (
                <ProfileImage
                  key={a.id}
                  src={a.src}
                  alt={a.alt ?? "avatar"}
                  size={32}
                />
              ))}
              {avatars && avatars.length > 3 && (
                <span className="service__avatar-extra">
                  +{avatars.length - 3}
                </span>
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
      )}
    </header>
  );
};

export default Header;
