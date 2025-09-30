import { useState } from 'react';
import './App.css';
import Badge from './components/common/Badge';
import BadgeEmoji from './components/common/BadgeEmoji';
import ToggleButton from './components/common/ToggleButton';

function App() {
  const [toggleValue, setToggleValue] = useState('컬러');
  const [clickedBadge, setClickedBadge] = useState<string>('');

  return (
    <>
      <Badge variant="other" onClick={() => setClickedBadge('other')} />
      <Badge variant="friend" onClick={() => setClickedBadge('friend')} />
      <Badge variant="coworker" onClick={() => setClickedBadge('coworker')} />
      <Badge variant="family" />
      {clickedBadge && <p>마지막으로 클릭한 뱃지: {clickedBadge}</p>}

      <BadgeEmoji emoji="party" count={14} />
      <div>
        <h3>선택된 값: {toggleValue}</h3>
        <ToggleButton
          options={['컬러', '이미지']}
          value={toggleValue}
          onValueChange={setToggleValue}
          className="styles.myToggle"
        />
      </div>
    </>
  );
}

export default App;
