import React from "react";
import "./button.css";

type Variant = "primary" | "secondary" | "outlined";
type Size = "lg" | "md" | "sm" | "xs";
type Shape = "default" | "circle" | "icon" | "trash";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  icon?: string; // 아이콘 이미지 경로
  children?: React.ReactNode; // 버튼 안 텍스트나 요소들
  className?: string; // 버튼 안 텍스트
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  shape = "default",
  icon,
  children, // ✅ label 대신 children 사용
  className,
  ...props
}) => {
  return (
    <button
      className={`btn ${variant} ${size} ${shape} ${className || ""}`}
      {...props}
    >
      {icon && <img src={icon} alt="icon" className="btn-icon" />}
      {children}
    </button>
  );
};

export default Button;
