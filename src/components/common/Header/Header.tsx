import "./Header.css";
import Button from "../buttons/button";
import BadgeEmoji from "../BadgeEmoji/BadgeEmoji";

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
      <div className="service">
        <div className="service__recipient">To. 수취인</div>
        <div className="service__meta">
          <img className="service__avatars" />
          <div className="service__count">
            N<span>명이 작성했어요!</span>
          </div>
          <div className="service__divider">|</div>

          <div className="service__reactions">
            <BadgeEmoji count={0} />
            <BadgeEmoji count={0} />
            <BadgeEmoji count={0} />
            <img
              className="service__reaction-arrow"
              src="src/assets/ic/arrow_down.svg"
            />
          </div>

          <div className="service__actions">
            <Button variant="outlined" size="md" shape="icon" children="추가" />
            <div className="service__divider">|</div>
            <Button variant="outlined" size="md" shape="icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
