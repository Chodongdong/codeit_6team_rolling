import './ToggleButton.css';
import type { ComponentPropsWithoutRef } from 'react';

type ToggleOption = string;

interface ToggleButtonProps extends ComponentPropsWithoutRef<'div'> {
  options: [ToggleOption, ToggleOption]; // 토글 두 개의 값만 받도록 제한
  value: ToggleOption;
  onValueChange: (value: ToggleOption) => void;
}

const ToggleButton = ({
  options,
  value,
  onValueChange,
  className,
  ...rest
}: ToggleButtonProps) => {
  return (
    <div className={`ToggleButton ${className ?? ''}`} {...rest}>
      <div className={`slider ${value === options[0] ? 'left' : 'right'}`} />

      {options.map((option) => (
        <button
          key={option}
          className={`option ${value === option ? 'active' : ''}`}
          onClick={() => onValueChange(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ToggleButton;
