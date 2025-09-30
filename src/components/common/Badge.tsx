/**
 * 다양한 종류의 뱃지를 표시하는 UI 컴포넌트
 *
 * @component
 * @example
 * // 기본 뱃지 사용 - variant 지정
 * <Badge variant="friend" /> // 친구
 *
 * @example
 * // 클릭 이벤트와 상태 연동 예시
 * const [selectedBadge, setSelectedBadge] = useState('');
 * <Badge variant="coworker" onClick={() => setSelectedBadge('coworker')} />
 * // 클릭하면 selectedBadge 상태가 'coworker'로 업데이트됨
 *
 * @param {BadgeVariant} variant - 뱃지 타입 ('other', 'friend', 'coworker', 'family')
 * @param {HTMLAttributes<HTMLDivElement>} props - div 기본 속성 (className, style, onClick 등)
 * @returns {JSX.Element} 선택한 variant에 맞는 라벨을 표시하는 div
 */

import type { HTMLAttributes } from "react";
import "./Badge.css";

const labels = {
  other: "지인",
  friend: "친구",
  coworker: "동료",
  family: "가족",
} as const;

type BadgeVariant = keyof typeof labels;

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant: BadgeVariant;
};

const Badge = ({ variant = "other", ...props }: BadgeProps) => {
  return (
    <div {...props} className={`Badge Badge--${variant}`}>
      {labels[variant]}
    </div>
  );
};

export default Badge;
