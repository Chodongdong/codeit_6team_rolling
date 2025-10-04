import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 1) 리셋을 최우선으로
import './styles/reset.css'

// 2) 전역 스타일(CDN 포함)
import './index.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)