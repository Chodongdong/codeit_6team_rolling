// src/components/Toast/types.ts
export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  id?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;   // ms 단위. 0이면 자동 닫힘 없음
  withIcon?: boolean;
}

export interface ToastItem extends Required<Omit<ToastOptions, 'id'>> {
  id: string;
}