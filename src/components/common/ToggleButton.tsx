import { useState } from 'react';
import './ToggleButton.css';

const ToggleButton = () => {
  const [selected, setSelected] = useState<'color' | 'image'>('color');

  return (
    <div className="ToggleButton">
      <div className={`slider ${selected === 'color' ? 'left' : 'right'}`} />

      <div
        className={`option ${selected === 'color' ? 'active' : ''}`}
        onClick={() => setSelected('color')}
      >
        컬러
      </div>
      <div
        className={`option ${selected === 'image' ? 'active' : ''}`}
        onClick={() => setSelected('image')}
      >
        이미지
      </div>
    </div>
  );
};

export default ToggleButton;
