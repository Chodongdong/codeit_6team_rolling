import "./BadgeEmoji.css";

interface BadgeEmojiProps {
  emoji: string;
  count: number;
  onClick?: () => void;
}

const BadgeEmoji = ({ emoji, count, onClick }: BadgeEmojiProps) => {
  return (
    <button className="BadgeEmoji" onClick={onClick}>
      <span className="BadgeEmoji__icon">{emoji}</span>
      <span className="BadgeEmoji__count">{count}</span>
    </button>
  );
};

export default BadgeEmoji;
