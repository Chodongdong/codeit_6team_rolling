import './ToggleButton.css';

type ToggleOption = 'color' | 'image';

interface ToggleButtonProps {
  value: ToggleOption;
  onChange: (value: ToggleOption) => void;
}

const ToggleButton = ({ value, onChange }: ToggleButtonProps) => {
  return (
    <div className="ToggleButton">
      <div className={`slider ${value === 'color' ? 'left' : 'right'}`} />

      <div
        className={`option ${value === 'color' ? 'active' : ''}`}
        onClick={() => onChange('color')}
      >
        컬러
      </div>
      <div
        className={`option ${value === 'image' ? 'active' : ''}`}
        onClick={() => onChange('image')}
      >
        이미지
      </div>
    </div>
  );
};

export default ToggleButton;
