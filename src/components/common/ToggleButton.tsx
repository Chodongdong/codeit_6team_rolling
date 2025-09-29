import './ToggleButton.css';

type ToggleOption = 'color' | 'image';

interface ToggleButtonProps {
  value: ToggleOption;
  onToggle: (value: ToggleOption) => void;
}

const ToggleButton = ({ value, onToggle }: ToggleButtonProps) => {
  return (
    <div className="ToggleButton">
      <div className={`slider ${value === 'color' ? 'left' : 'right'}`} />

      <button
        className={`option ${value === 'color' ? 'active' : ''}`}
        onClick={() => onToggle('color')}
      >
        컬러
      </button>
      <button
        className={`option ${value === 'image' ? 'active' : ''}`}
        onClick={() => onToggle('image')}
      >
        이미지
      </button>
    </div>
  );
};

export default ToggleButton;
