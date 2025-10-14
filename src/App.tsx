// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import MainHome from "./pages/MainHome";
import RouteTest from "./pages/RouteTest";
import List from "./pages/List"; // 추가: 실제 리스트 페이지 연결

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainHome />} /> {/* 메인 페이지 */}
          <Route path="list" element={<List />} /> {/* 롤링페이퍼 목록 페이지 */}
          <Route path="post/:id" element={<RouteTest />} /> {/* 생성된 롤링페이퍼 페이지 */}
          <Route path="post" element={<RouteTest />} /> {/* 생성 페이지 */}
          <Route path="post/:id/message" element={<RouteTest />} /> {/* 롤링페이퍼에 메시지 보내기 페이지 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
