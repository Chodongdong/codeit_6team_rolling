/**
 * 공감 이모지와 해당 이모지에 대한 카운트(숫자)를 표시하는 UI 컴포넌트
 *
 * @component
 * @example
 * // 기본 사용 예시 - 상위 컴포넌트에서 props로 전달받아 출력
 * <BadgeEmoji emoji='party' count={5}/> // 🥳 5
 * @example
 * // 이모지 없이 숫자만 출력
 * <BadgeEmoji count={10}/> // 10
 *
 *
 * @param {EmojiKey} [emoji] - 표시할 이모지의 key (예: 'party', 'love')
 * @param {number} count - 해당 이모지의 카운트 값
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} [onClick] - 클릭 이벤트 핸들러
 * @returns {JSX.Element} 이모지와 카운트를 함께 출력하는 JSX 엘리먼트
 */

import React from 'react';
import './BadgeEmoji.css';

// 이모지 모음 객체(추후 추가 가능)
const emojiMap = {
  fourLeafClover: '🍀',
  party: '🥳',
  love: '😍',
  thumbsUp: '👍',
} as const;

// emoji prop 타입: emojiMap의 key 중 하나
type EmojiKey = keyof typeof emojiMap;

interface BadgeEmojiProps {
  emoji?: EmojiKey; // 선택적: 없으면 숫자만 출력
  count: number; // 필수: 무조건 출력
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // 선택적: 외부 주입
}

const BadgeEmoji = React.forwardRef<HTMLButtonElement, BadgeEmojiProps>(
  ({ emoji, count, onClick }, ref) => {
    return (
      <button ref={ref} className="BadgeEmoji" onClick={onClick}>
        {emoji && <span>{emojiMap[emoji]}</span>}
        <span>{count}</span>
      </button>
    );
  }
);

BadgeEmoji.displayName = 'BadgeEmoji'; //디버깅 위해 작성한 코드(없어도 동작함)

export default BadgeEmoji;
