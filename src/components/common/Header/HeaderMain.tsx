import "./Header.css";
import Button from "../buttons/button";
import { logo } from "../../../assets/index";

const HeaderMain = () => {
  return (
    <header className="Header">
      <div className="main">
        <img src={logo} alt="Rolling Logo" />
        <Button variant="outlined" size="md" shape="default">
          {" "}
          롤링 페이퍼 만들기
        </Button>
      </div>
    </header>
  );
};

export default HeaderMain;
