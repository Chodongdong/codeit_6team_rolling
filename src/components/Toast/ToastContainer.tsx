
import { Toast } from './Toast';
import { useToast } from './useToast';
import './toast.css';

export default function ToastContainer({
  position = 'bottom-center',
}: {
  position?: 'bottom-center' | 'top-right';
}) {
  const { toasts } = useToast();
  const cls = position === 'bottom-center' ? 'toast-wrap bottom-center' : 'toast-wrap';
  return (
    <div className={cls} aria-live="polite" aria-atomic="true">
      {toasts.map(t => <Toast key={t.id} item={t} />)}
    </div>
  );
}