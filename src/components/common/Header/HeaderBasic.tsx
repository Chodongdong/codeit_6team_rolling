import { logo } from "../../../assets/index";
import "./Header.css";
import { Link } from "react-router-dom";

const HeaderBasic = () => {
  return (
    <header className="Header">
      <div className="main">
        <Link to={"/"}>
          <img src={logo} alt="Rolling Logo" />
        </Link>
      </div>
    </header>
  );
};

export default HeaderBasic;
