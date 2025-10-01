/**
 * 롤링페이퍼 생성 페이지에서 배경 색상or이미지 선택하는 옵션 컴포넌트
 *
 * - 사용자가 클릭하면 선택 상태(`is-selected`)가 적용됩니다.
 * - 선택된 칩 위에는 공용 `Button` 컴포넌트(체크 아이콘)가 표시됩니다.
 * - 부모 컴포넌트는 `onSelect` 콜백을 통해 사용자가 선택한 값을 받을 수 있습니다.
 *
 * @prop {string[]} options - 선택 가능한 색상(hex 코드) 또는 이미지 URL 배열
 * @prop {"color" | "image"} type - 칩의 타입을 지정합니다.
 *    - "color": `backgroundColor`를 통해 색상 칩 표시
 *    - "image": `backgroundImage`를 통해 이미지 칩 표시
 * @prop {(value: string) => void} [onSelect] - 선택 시 부모에 전달되는 콜백 함수
 *
 * @example
 * // 색상 옵션 예시
 * <ColorChip
 *    type="color"
 *    options={["#FFE2AD", "#ECD9FF", "#B1E4FF", "#D0F5C3"]}
 *    onSelect={(val) => console.log("선택한 색상:", val)}
 * />
 *
 * @example
 * // 이미지 옵션 예시
 * <ColorChip
 *    type="image"
 *    options={[
 *      "src/assets/bg/bg1.jpg",
 *      "src/assets/bg/bg2.jpg",
 *      "src/assets/bg/bg3.jpg",
 *      "src/assets/bg/bg4.jpg",
 *    ]}
 *    onSelect={(val) => console.log("선택한 이미지:", val)}
 * />
 */

import { useState } from "react";
import Button from "../buttons/button";
import "./ColorChip.css";

interface ColorChipProps {
  options: string[];
  type: "color" | "image";
  onSelect?: (value: string) => void;
}

const ColorChip = ({ options, type, onSelect }: ColorChipProps) => {
  const [selected, setSelected] = useState<string>(options[0]);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect?.(value);
  };

  return (
    <div className="ColorChip">
      {options.map((option) => (
        <div
          key={option}
          className={`ColorChip__item ${
            selected === option ? "is-selected" : ""
          }`}
          style={
            type === "color"
              ? { backgroundColor: option }
              : { backgroundImage: `url(${option})` }
          }
          onClick={() => handleSelect(option)}
        >
          {selected === option && (
            <Button
              shape="circle"
              size="xs"
              icon="assets/check.svg"
              className="checked-icon"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ColorChip;
