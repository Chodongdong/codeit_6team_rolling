// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './styles/reset.css';
import './index.css';

import App from './App.tsx';
import { ToastProvider } from './components/Toast/useToast';
import ToastContainer from './components/Toast/ToastContainer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </ToastProvider>
  </StrictMode>
);