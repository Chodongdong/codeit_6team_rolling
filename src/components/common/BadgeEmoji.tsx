import { useState } from 'react';
import './BadgeEmoji.css';

const BadgeEmoji = () => {
  // const [emoji, setEmoji] = useState('😇');
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <button className="BadgeEmoji" onClick={handleClick}>
      <div className="BadgeEmoji_emoji">😇</div>
      <div className="BadgeEmoji_number">{count}</div>
    </button>
  );
};

export default BadgeEmoji;
