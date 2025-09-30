/**
 * 두 가지 옵션 중 하나를 선택할 수 있는 토글 버튼 UI.
 *
 *
 * @component
 * @example
 * // App.tsx
 * import ToggleButton from './ToggleButton';
 *
 * function App() {
 *    //상위 컴포넌트에서 원하는 옵션을 지정할 수 있음.
 *   const [value, setValue] = useState<'Light' | 'Dark'>('Light');
 *
 *   return (
 *     <ToggleButton
 *       options={['Light', 'Dark']}
 *       value={value}
 *       onValueChange={setValue}
 *     />
 *   );
 * }
 *
 * @prop {string[]} options - 두 가지 옵션을 담은 배열 (ex: ['컬러', '이미지'])
 * @prop {string} value - 현재 선택된 옵션 값
 * @prop {(value: string) => void} onValueChange - 선택된 옵션이 변경될 때 실행되는 핸들러
 * @prop {string} [className] - 커스텀 스타일 적용을 위한 선택적 클래스명
 * @returns {JSX.Element} 토글 버튼 UI
 */

import "./ToggleButton.css";
import type { ComponentPropsWithoutRef } from "react";

type ToggleOption = string;

interface ToggleButtonProps extends ComponentPropsWithoutRef<"div"> {
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
    <div className={`ToggleButton ${className ?? ""}`} {...rest}>
      <div className={`slider ${value === options[0] ? "left" : "right"}`} />

      {options.map((option) => (
        <button
          key={option}
          className={`option ${value === option ? "active" : ""}`}
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
