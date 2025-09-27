import { Outlet } from "react-router-dom";

export default function PostLayout() {
  return (
    <div>
      <h2>게시글 관리</h2>
      <Outlet />
    </div>
  );
}