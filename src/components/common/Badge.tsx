import type { HTMLAttributes } from 'react';
import './Badge.css';

const labels = {
  other: '지인',
  friend: '친구',
  coworker: '동료',
  family: '가족',
} as const;

type BadgeVariant = keyof typeof labels;

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant: BadgeVariant;
};

const Badge = ({ variant = 'other', className = '', ...props }: BadgeProps) => {
  return (
    <div {...props} className={`Badge Badge--${variant} ${className}`}>
      {labels[variant]}
    </div>
  );
};

export default Badge;
