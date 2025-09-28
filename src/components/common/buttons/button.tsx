import React from "react";
import "./Button.css";

type Variant = "primary" | "secondary" | "outlined";
type Size =
  | "lg"   // 208x56
  | "md"   // 122x40
  | "sm"   // 122x36
  | "xs";  // 122x28
type Shape = "default" | "circle" | "icon" | "trash"; // circle: 동그란 버튼, icon: 아이콘 전용

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  icon?: string; // 아이콘 이미지 경로
  label?: string; // 버튼 안 텍스트
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  shape = "default",
  icon,
  label,
  ...props
}) => {
  return (
    <button
      className={`btn ${variant} ${size} ${shape}`}
      {...props}
    >
      {icon && <img src={icon} alt="icon" className="btn-icon" />}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button;
