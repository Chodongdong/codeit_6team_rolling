// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import RouteTest from "./pages/RouteTest";
import MainPages from "./pages/MainPages";
import Post from "./pages/post";
import PostMessagePage from "./pages/PostMessagePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RouteTest />} /> {/* 메인 페이지 */}
          <Route path="list" element={<RouteTest />} />{" "}
          {/* 롤링페이퍼 목록 페이지 */}
          <Route path="post/:id" element={<MainPages />} />{" "}
          {/* 생성된 롤링페이퍼 페이지 */}
          <Route path="post" element={<Post />} /> {/* 생성 페이지 */}
          <Route path="post/:id/message" element={<PostMessagePage />} />{" "}
          {/* 롤링페이퍼에 메시지 보내기 페이지 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
