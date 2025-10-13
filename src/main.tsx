import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 1) 리셋을 최우선으로
import './styles/reset.css';

// 2) 전역 스타일(CDN 포함)
import './index.css';

import App from './App.tsx';

// 토스트 전역 연결
import { ToastProvider } from './components/Toast/useToast';
import ToastContainer from './components/Toast/ToastContainer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
      <ToastContainer />
    </ToastProvider>
  </StrictMode>
);