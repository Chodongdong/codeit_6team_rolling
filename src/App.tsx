import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import UserProfile from './pages/UserProfile';
import UserSettings from './pages/UserSettings';
import PostDetail from './pages/PostDetail';
import PostEdit from './pages/PostEdit';

// Layouts
import Layout from './components/Layout';
import UserLayout from './components/user/UserLayout';
import PostLayout from './components/post/PostLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          {/* User 관련 그룹 */}
          <Route path="user" element={<UserLayout />}>
            <Route path=":userId" element={<UserProfile />} />
            <Route path=":userId/settings" element={<UserSettings />} />
          </Route>

          {/* Post 관련 그룹 */}
          <Route path="post" element={<PostLayout />}>
            <Route path=":postId" element={<PostDetail />} />
            <Route path=":postId/edit" element={<PostEdit />} />
          </Route>

          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
