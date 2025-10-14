import "./Header.css";
import { useEffect, useState } from "react";
import BadgeEmoji from "../BadgeEmoji/BadgeEmoji";
import Button from "../buttons/button";
import ProfileImage from "../Option/ProfileImage";
import type { HeaderProps, Reaction, Avatar } from "./Header.types";
import { shareIcon } from "../../../assets/index";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = "https://rolling-api.vercel.app/19-6";

const HeaderService = ({
  recipient = "수취인",
  avatars = [],
  totalWriters = 0,
  reactions: initialReactions = [],
}: HeaderProps) => {
  const params = useParams();
  const recipientId = Number(params.id);

  const [reactions, setReactions] = useState<Reaction[]>(initialReactions);
  const [showReactions, setShowReactions] = useState(false); // 공감 확장 팝오버
  const [showShare, setShowShare] = useState(false); // 공유 팝오버
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // 컴포넌트 마운트 시 GET요청으로 초기 리액션 로드
  useEffect(() => {
    if (!recipientId) return;

    const fetchReactions = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/recipients/${recipientId}/reactions/`
        );
        // 스웨거 응답: { results: [ {id, emoji, count}, ... ], ... } 또는 직접 배열일 수 있음
        const data = res.data;
        const list = Array.isArray(data) ? data : (data.results ?? []);
        // 서버가 emoji 필드명/형식을 어떻게 주는지 확인 필요 — 여기선 emoji, count 기대
        const normalized: Reaction[] = list.map((r: Reaction) => ({
          id: r.id,
          emoji: r.emoji,
          count: r.count,
        }));
        setReactions(normalized);
      } catch (err) {
        console.warn("리액션 불러오기 실패:", err);
      }
    };

    fetchReactions();
  }, [recipientId]);

  // 이모지 클릭 -> POST -> UI 업데이트
  const handleEmojiClick = async (emojiData: EmojiClickData) => {
    const newEmoji = emojiData.emoji;
    setShowEmojiPicker(false);

    if (!recipientId) {
      alert("recipient id가 없습니다.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/recipients/${recipientId}/reactions/`,
        {
          emoji: newEmoji,
          type: "increase",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const newReaction: Reaction = res.data;

      setReactions((prev) => {
        const existing = prev.find((r) => r.emoji === newReaction.emoji);
        if (existing) {
          return prev.map((r) =>
            r.emoji === newReaction.emoji
              ? { ...r, count: newReaction.count, id: newReaction.id ?? r.id }
              : r
          );
        } else {
          return [
            ...prev,
            {
              id: newReaction.id,
              emoji: newReaction.emoji,
              count: newReaction.count,
            },
          ];
        }
      });
    } catch (error) {
      console.error("이모지 추가 실패:", error);
      alert("이모지 추가 중 오류가 발생했습니다.");
    }
  };

  // 이미 존재하는 이모지 클릭 시 -> count 증가
  const handleReactionClick = async (emoji: string) => {
    if (!recipientId) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/recipients/${recipientId}/reactions/`,
        { emoji, type: "increase" },
        { headers: { "Content-Type": "application/json" } }
      );

      const updated = res.data;

      setReactions((prev) =>
        prev.map((r) =>
          r.emoji === updated.emoji ? { ...r, count: updated.count } : r
        )
      );
    } catch (error) {
      console.error("리액션 클릭 실패:", error);
    }
  };

  return (
    <div className="Header service">
      <div className="service__recipient">To. {recipient}</div>

      <div className="service__meta">
        <div className="service__avatars">
          {avatars.slice(0, 3).map((a: Avatar) => (
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

        <div className="service__count service__segment">
          {totalWriters}
          <span>명이 작성했어요!</span>
        </div>

        <div className="service__reactions">
          {reactions.slice(0, 3).map((r: Reaction, i: number) => (
            <BadgeEmoji
              key={String(r.emoji) + i}
              emoji={r.emoji}
              count={r.count}
              onClick={() => handleReactionClick(r.emoji)}
            />
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
              {reactions.map((r: Reaction, i: number) => (
                <BadgeEmoji
                  key={String(r.emoji) + i}
                  emoji={r.emoji}
                  count={r.count}
                  onClick={() => handleReactionClick(r.emoji)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="service__actions service__segment">
          <Button
            variant="outlined"
            size="sm"
            icon="../src/assets/smile.png"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            {" "}
            추가{" "}
          </Button>

          {showEmojiPicker && (
            <div className="emoji-picker-wrapper">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          <div className="share-wrapper">
            <Button
              variant="outlined"
              size="md"
              shape="icon"
              icon={shareIcon}
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
