/**
 * 공감 이모지와 해당 이모지에 대한 카운트(숫자)를 표시하는 UI 컴포넌트
 *
 * @component
 * @example
 * // 기본 사용 예시 - 상위 컴포넌트에서 props로 전달받아 출력
 * <BadgeEmoji emoji="🥳" count={14} />
 *
 * @param {string} emoji - 표시할 이모지 (문자열)
 * @param {number} count - 해당 이모지의 카운트 값
 * @returns {JSX.Element} 이모지와 카운트를 함께 출력하는 JSX 엘리먼트
 */

import './BadgeEmoji.css';

interface BadgeEmojiProps {
  emoji: string;
  count: number;
}

const BadgeEmoji: React.FC<BadgeEmojiProps> = ({ emoji, count }) => {
  return (
    <div className="BadgeEmoji">
      {emoji && <span>{emoji}</span>}
      <span>{count}</span>
    </div>
  );
};

export default BadgeEmoji;
