// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';

import MainHome from './pages/MainHome';
import List from './pages/List';     

import Post from './pages/post';

const App: React.FC = () => {
  return (
    <Routes>
      {/* 메인 랜딩 */}
      <Route path="/" element={<MainHome />} />

      <Route path="/list" element={<List />} />

      <Route path="/post" element={<Post />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;