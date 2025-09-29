import { useState } from 'react';
import './App.css';
import Badge from './components/common/Badge';
import BadgeEmoji from './components/common/BadgeEmoji';
import ToggleButton from './components/common/ToggleButton';

function App() {
  const [toggleValue, setToggleValue] = useState<'color' | 'image'>('color');
  return (
    <>
      <Badge variant="other" className="is-selected" />
      <Badge variant="friend" />
      <Badge variant="coworker" />
      <Badge variant="family" />
      <BadgeEmoji emoji="party" count={14} />
      <div>
        <h3>선택된 값: {toggleValue}</h3>
        <ToggleButton value={toggleValue} onChange={setToggleValue} />{' '}
      </div>
    </>
  );
}

export default App;
