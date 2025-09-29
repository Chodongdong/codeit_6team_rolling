import "./PlusButton.css";
import React, { type ComponentPropsWithoutRef, useState } from "react";
import plusIcon from "../../assets/ic/plus.svg";

interface PlusButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: number; // 기본값 56px
}

const PlusButton: React.FC<PlusButtonProps> = ({
  size = 56,
  className = "",
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // CSS 변수로 size 적용
  const mergedStyle: React.CSSProperties = {
    ...style,
    "--plus-button-size": `${size}px`,
  } as React.CSSProperties;

  const disabled = props.disabled;

  return (
    <button
      className={`plus-button 
        ${isHovered ? "hover" : ""} 
        ${isPressed ? "pressed" : ""} 
        ${isFocused ? "focus" : ""} 
        ${disabled ? "disabled" : ""} 
        ${className}`}
      style={mergedStyle}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    >
      <div className="plus-bg" />
      <img src={plusIcon} alt="plus" className="plus-icon" />
    </button>
  );
};

export default PlusButton;
