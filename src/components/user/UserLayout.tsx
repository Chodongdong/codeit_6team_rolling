import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div>
      <h2>사용자 관리</h2>
      <Outlet />
    </div>
  );
}