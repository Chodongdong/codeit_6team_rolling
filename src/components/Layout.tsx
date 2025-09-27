import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">홈</Link> | <Link to="/about">소개</Link> |
          <Link to="/user/1">사용자 프로필</Link> |
          <Link to="/user/1/settings">설정</Link> |
          <Link to="/post/1">게시글</Link> |
          <Link to="/post/1/edit">게시글 수정</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
