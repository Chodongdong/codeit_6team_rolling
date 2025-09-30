import "./Header.css";
import Button from "../buttons/button";

const Header = () => {
  return (
    <header className="Header">
      <div className="main">
        <img src="src/assets/logo/logo.svg" />
        <Button
          variant="outlined"
          size="md"
          shape="default"
          children="롤링 페이퍼 만들기"
        />
      </div>
      <div className="service"></div>
    </header>
  );
};

export default Header;
