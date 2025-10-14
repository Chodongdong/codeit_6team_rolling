
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ToastItem, ToastOptions } from './types';

type ToastContextValue = {
  show: (opts: ToastOptions | string) => string;
  hide: (id: string) => void;
  clear: () => void;
  toasts: ToastItem[];
};

const ToastContext = createContext<ToastContextValue | null>(null);

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const DEFAULT_DURATION = 1500; // 1.5초

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((opts: ToastOptions | string) => {
    const normalized: ToastItem =
      typeof opts === 'string'
        ? {
            id: uid(),
            message: opts,
            variant: 'success',
            duration: DEFAULT_DURATION,
            withIcon: true,
          }
        : {
            id: opts.id ?? uid(),
            message: opts.message,
            variant: opts.variant ?? 'success',
            duration: opts.duration ?? DEFAULT_DURATION,
            withIcon: opts.withIcon ?? true,
          };

    setToasts(prev => [normalized, ...prev]);

    if (normalized.duration > 0) {
      const id = normalized.id;
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, normalized.duration);
    }

    return normalized.id;
  }, []);

  const hide = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const clear = useCallback(() => setToasts([]), []);

  const value = useMemo(() => ({ show, hide, clear, toasts }), [show, hide, clear, toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}