import './App.css';
import Badge from './components/common/Badge';
import BadgeEmoji from './components/common/BadgeEmoji';
import ToggleButton from './components/common/ToggleButton';

function App() {
  return (
    <>
      <Badge variant="other" className="is-selected" />
      <Badge variant="friend" />
      <Badge variant="coworker" />
      <Badge variant="family" />
      <BadgeEmoji />
      <ToggleButton />
    </>
  );
}

export default App;
