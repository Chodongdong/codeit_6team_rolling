import { useState } from 'react';
import './App.css';
import Badge from './components/common/Badge';
import BadgeEmoji from './components/common/BadgeEmoji';
import ToggleButton from './components/common/ToggleButton';

function App() {
  const [toggleValue, setToggleValue] = useState('컬러');
  return (
    <>
      <Badge variant="other" className="is-selected" />
      <Badge variant="friend" />
      <Badge variant="coworker" />
      <Badge variant="family" />
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
