/**
 * 공감 이모지와 해당 이모지에 대한 카운트(숫자)를 표시하는 UI 컴포넌트
 *
 * @component
 * @example
 * // 기본 사용 예시 - 상위 컴포넌트에서 props로 전달받아 출력
 * <BadgeEmoji emoji="party" count={5}/> // 🥳 5
 * @example
 * // 클릭 이벤트 등 버튼 기본 props 전달 가능
 * const handleClick = () => alert("Clicked!");
 * <BadgeEmoji emoji="love" count={10} onClick={handleClick} />
 *
 * @param {EmojiKey} [emoji] - 표시할 이모지의 key (예: "party", "love")
 * @param {number} count - 해당 이모지의 카운트 값
 * @param {ComponentPropsWithRef<"button">} props - button 기본 속성(className, style, onClick 등) 전달 가능
 * @returns {JSX.Element} 이모지와 카운트를 함께 표시하는 button
 */

import type { ComponentPropsWithRef } from "react";
import "./BadgeEmoji.css";

// 이모지 모음 객체(추후 추가 가능)
const emojiMap = {
  fourLeafClover: "🍀",
  party: "🥳",
  love: "😍",
  thumbsUp: "👍",
} as const;

// emoji prop 타입: emojiMap의 key 중 하나
type EmojiKey = keyof typeof emojiMap;

interface BadgeEmojiProps extends ComponentPropsWithRef<"button"> {
  emoji?: EmojiKey; // 선택적: 없으면 숫자만 출력
  count: number; // 필수: 무조건 출력
}

const BadgeEmoji = ({ emoji, count, ...props }: BadgeEmojiProps) => {
  return (
    <button className="BadgeEmoji" {...props}>
      {emoji && <span>{emojiMap[emoji]}</span>}
      <span>{count}</span>
    </button>
  );
};

export default BadgeEmoji;
