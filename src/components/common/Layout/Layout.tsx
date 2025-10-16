import "./Layout.css";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import HeaderMain from "../Header/HeaderMain"; // 로고 + 버튼 헤더
import HeaderBasic from "../Header/HeaderBasic"; // 로고만 있는 헤더
import HeaderService from "../Header/HeaderService"; // 서비스 헤더 (ex. 리액션, 공유버튼 등)

function Layout() {
  const { pathname } = useLocation();

  const isMobile = useMediaQuery({ query: "(max-width: 360px)" });

  // 페이지 구분
  const isMainPage = pathname === "/";
  const isListPage = pathname.startsWith("/list");
  const isCreatePage = pathname === "/post";
  const isPostPage = /^\/post\/[^/]+$/.test(pathname); // /post/:id
  const isMessagePage = /^\/post\/[^/]+\/message$/.test(pathname);

  // Header 결정
  let HeaderComponent = null;
  if (isMainPage || isListPage) {
    HeaderComponent = <HeaderMain />;
  } else if (isPostPage) {
    HeaderComponent = isMobile ? (
      <HeaderService />
    ) : (
      <>
        <HeaderBasic />
        <HeaderService />
      </>
    );
  } else if (isCreatePage || isMessagePage) {
    HeaderComponent = isMobile ? null : <HeaderBasic />;
  }

  return (
    <div>
      {HeaderComponent}
      <main>
        <Outlet /> {/* 각 페이지 내용 렌더링*/}
      </main>
    </div>
  );
}

export default Layout;
