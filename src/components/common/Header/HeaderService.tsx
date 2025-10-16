import "./Header.css";
import { useEffect, useState } from "react";
import BadgeEmoji from "../BadgeEmoji/BadgeEmoji";
import Button from "../buttons/button";
import ProfileImage from "../Option/ProfileImage";
import type { Reaction, Avatar } from "./Header.types";
import { shareIcon, smile } from "../../../assets/index";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = "https://rolling-api.vercel.app/19-6";

// ✅ API 응답 타입 정의
interface RecipientResponse {
  id: number;
  name: string;
}

interface Message {
  id: number;
  sender: string;
  profileImageURL: string | null;
}

const HeaderService = () => {
  const params = useParams();
  const recipientId = Number(params.id);

  // ✅ 상태 정의
  const [recipientName, setRecipientName] = useState("");
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [totalWriters, setTotalWriters] = useState(0);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [showReactions, setShowReactions] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // =======================================================
  // 1️⃣ 수취인 정보 불러오기
  // =======================================================
  useEffect(() => {
    if (!recipientId) return;

    const fetchRecipient = async () => {
      try {
        const res = await axios.get<RecipientResponse>(
          `${BASE_URL}/recipients/${recipientId}/`
        );
        setRecipientName(res.data.name);
      } catch (err) {
        console.warn("❌ 수취인 불러오기 실패:", err);
      }
    };

    fetchRecipient();
  }, [recipientId]);

  // =======================================================
  // 2️⃣ 작성자 목록 불러오기
  // =======================================================
  useEffect(() => {
    if (!recipientId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get<{ results: Message[] }>(
          `${BASE_URL}/recipients/${recipientId}/messages/`
        );

        const messages = Array.isArray(res.data.results)
          ? res.data.results
          : [];

        const avatarList: Avatar[] = messages.slice(0, 3).map((msg) => ({
          id: msg.id,
          src: msg.profileImageURL || "",
          alt: msg.sender,
        }));

        setAvatars(avatarList);
        setTotalWriters(messages.length);
      } catch (err) {
        console.warn("❌ 메시지 목록 불러오기 실패:", err);
      }
    };

    fetchMessages();
  }, [recipientId]);

  // =======================================================
  // 3️⃣ 리액션 불러오기
  // =======================================================
  useEffect(() => {
    if (!recipientId) return;

    const fetchReactions = async () => {
      try {
        const res = await axios.get<{ results: Reaction[] }>(
          `${BASE_URL}/recipients/${recipientId}/reactions/`
        );

        const data = Array.isArray(res.data.results) ? res.data.results : [];

        const normalized: Reaction[] = data.map((r) => ({
          id: r.id,
          emoji: r.emoji,
          count: r.count,
        }));

        setReactions(normalized);
      } catch (err) {
        console.warn("❌ 리액션 불러오기 실패:", err);
      }
    };

    fetchReactions();
  }, [recipientId]);

  // =======================================================
  // 4️⃣ 이모지 추가 핸들러
  // =======================================================
  const handleEmojiClick = async (emojiData: EmojiClickData) => {
    const newEmoji = emojiData.emoji;
    setShowEmojiPicker(false);

    if (!recipientId) {
      alert("recipient id가 없습니다.");
      return;
    }

    try {
      const res = await axios.post<Reaction>(
        `${BASE_URL}/recipients/${recipientId}/reactions/`,
        { emoji: newEmoji, type: "increase" },
        { headers: { "Content-Type": "application/json" } }
      );

      const newReaction = res.data;

      setReactions((prev) => {
        const existing = prev.find((r) => r.emoji === newReaction.emoji);
        if (existing) {
          return prev.map((r) =>
            r.emoji === newReaction.emoji
              ? { ...r, count: newReaction.count }
              : r
          );
        } else {
          return [...prev, newReaction];
        }
      });
    } catch (error) {
      console.error("이모지 추가 실패:", error);
    }
  };

  // =======================================================
  // 5️⃣ 기존 리액션 클릭 시 count 증가
  // =======================================================
  const handleReactionClick = async (emoji: string) => {
    if (!recipientId) return;

    try {
      const res = await axios.post<Reaction>(
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

  const JAVASCRIPT_KEY = import.meta.env.VITE_APP_JAVASCRIPT_KEY;

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(JAVASCRIPT_KEY);
    }
  }); // 빈 배열이면 최초 1회만 실행

  const handleShare = () => {
    // Kakao SDK의 sendDefault 메서드 사용
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "공유 테스트 제목",
        description: "이건 카카오톡 공유하기 테스트입니다.",
        imageUrl: "https://example.com/sample-image.png", // 실제 이미지 URL 넣기
        link: {
          mobileWebUrl: "https://example.com",
          webUrl: "https://example.com",
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: "https://example.com",
            webUrl: "https://example.com",
          },
        },
      ],
    });
  };

  // =======================================================
  // 렌더링
  // =======================================================
  return (
    <div className="Header service">
      <div className="service__recipient">To. {recipientName}</div>

      <div className="service__meta">
        <div className="service__avatars">
          {avatars.map((a) => (
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
          {reactions.slice(0, 3).map((r, i) => (
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
              src="../src/assets/arrow_down.svg"
              alt="reactions more"
              onClick={() => setShowReactions((prev) => !prev)}
            />
          )}

          {showReactions && (
            <div className="popover popover--reactions">
              {reactions.map((r, i) => (
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
            icon={smile}
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <span className="btn-text">추가</span>
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
                <button className="popover__item" onClick={handleShare}>
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
