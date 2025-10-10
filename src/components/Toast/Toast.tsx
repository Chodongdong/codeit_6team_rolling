
import { useToast } from './useToast';
import type { ToastItem } from './types';

import CheckIcon from '../../assets/icons/toast/check-circle.svg';
import CloseIcon from '../../assets/icons/toast/close.svg';

export function Toast({ item }: { item: ToastItem }) {
  const { hide } = useToast();
  const { id, message, variant, withIcon } = item;

  return (
    <div className={`toast toast--${variant}`} role="status">
      {withIcon && (
        <span className="toast__icon" aria-hidden="true">
          <img src={CheckIcon} alt="" />
        </span>
      )}
      <span className="toast__message">{message}</span>
      <button className="toast__close" aria-label="닫기" onClick={() => hide(id)}>
        <img src={CloseIcon} alt="" />
      </button>
    </div>
  );
}