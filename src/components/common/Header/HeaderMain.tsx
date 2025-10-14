import "./Header.css";
import Button from "../buttons/button";
import { logo } from "../../../assets/index";
import { Link } from "react-router-dom";

const HeaderMain = () => {
  return (
    <header className="Header">
      <div className="main">
        <Link to="/">
          <img src={logo} alt="Rolling Logo" />
        </Link>
        <Link to="/post">
          <Button variant="outlined" size="md" shape="default">
            {" "}
            롤링 페이퍼 만들기
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default HeaderMain;
