/**
 * 다양한 종류의 뱃지를 표시하는 UI 컴포넌트
 *
 * @component
 * @example
 * // 뱃지 사용 - variant 지정
 * <Badge variant="friend" /> // 친구
 *
 * @param {BadgeVariant} variant - 뱃지 타입 ('other', 'friend', 'coworker', 'family')
 * @param {ComponentPropsWithoutRef<'span'>} props - span 기본 속성 (className 등)
 * @returns {JSX.Element} 선택한 variant에 맞는 라벨을 표시하는 span
 */

import type { ComponentPropsWithoutRef } from "react";
import "./Badge.css";

const labels = {
  other: "지인",
  friend: "친구",
  coworker: "동료",
  family: "가족",
} as const;

type BadgeVariant = keyof typeof labels;

interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant: BadgeVariant;
}

function Badge({ variant = "other", className = "", ...props }: BadgeProps) {
  return (
    <span className={`Badge Badge--${variant} ${className}`} {...props}>
      {labels[variant]}
    </span>
  );
}

export default Badge;
