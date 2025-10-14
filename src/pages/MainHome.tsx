// src/pages/MainHome.tsx
import { useNavigate } from "react-router-dom";
import "./MainHome.css";
import img01 from "../assets/img_01.png";
import img02 from "../assets/img_02.png";

export default function MainHome() {
  const nav = useNavigate();

  return (
    <main className="page page-home">
      <div className="header-spacer" aria-hidden="true" />

      {/* 섹션 1: 텍스트 왼쪽 / 이미지 오른쪽 */}
      <section className="section">
        <div className="grid two-col">
          <div className="col text">
            <span className="point-badge">Point. 01</span>
            <h2 className="title">
              누구나 손쉽게, 온라인
              <br />
              롤링 페이퍼를 만들 수 있어요
            </h2>
            <p className="desc">로그인 없이 자유롭게 만들고 링크로 공유해요.</p>
          </div>
          <div className="col visual">
            <img className="section-image" src={img01} alt="메인 시안 섹션 1" />
          </div>
        </div>
      </section>

      {/* 섹션 2: 이미지 왼쪽 / 텍스트 오른쪽 */}
      <section className="section">
        <div className="grid two-col reversed">
          <div className="col visual">
            <img className="section-image" src={img02} alt="메인 시안 섹션 2" />
          </div>
          <div className="col text">
            <span className="point-badge">Point. 02</span>
            <h2 className="title">
              서로에게 이모지로 감정을
              <br />
              표현해보세요
            </h2>
            <p className="desc">
              롤링 페이퍼에 이모지를 추가하고 반응을 모아보세요.
            </p>
          </div>
        </div>
      </section>

      <div className="cta-wrap">
        <button className="cta" type="button" onClick={() => nav("/list")}>
          구경해보기
        </button>
      </div>
    </main>
  );
}
