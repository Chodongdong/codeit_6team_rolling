import { logo } from "../../../assets/index";
import "./Header.css";

const HeaderBasic = () => {
  return (
    <header className="Header">
      <div className="main">
        <img src={logo} alt="Rolling Logo" />
      </div>
    </header>
  );
};

export default HeaderBasic;
