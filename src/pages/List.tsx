import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './List.css';
import ArrowButton from '../components/common/ArrowButton/ArrowButton'; // 네 프로젝트 경로에 맞춰 조정

type CardItem = {
  id: number | string;
  to: string;
  msgCount: number;
  react: { like: number; heart: number; wow: number };
};

const popularData: CardItem[] = [
  { id: 101, to: 'Sowon', msgCount: 30, react: { like: 20, heart: 12, wow: 7 } },
  { id: 102, to: 'Sowon', msgCount: 28, react: { like: 17, heart: 14, wow: 5 } },
  { id: 103, to: 'Sowon', msgCount: 35, react: { like: 26, heart: 18, wow: 9 } },
  { id: 104, to: 'Sowon', msgCount: 22, react: { like: 12, heart: 9, wow: 4 } },
  { id: 105, to: 'Sowon', msgCount: 31, react: { like: 21, heart: 13, wow: 6 } },
  { id: 106, to: 'Sowon', msgCount: 29, react: { like: 18, heart: 10, wow: 5 } },
];

const recentData: CardItem[] = [
  { id: 201, to: 'Sowon', msgCount: 30, react: { like: 20, heart: 12, wow: 7 } },
  { id: 202, to: 'Sowon', msgCount: 33, react: { like: 22, heart: 15, wow: 8 } },
  { id: 203, to: 'Sowon', msgCount: 27, react: { like: 14, heart: 10, wow: 4 } },
  { id: 204, to: 'Sowon', msgCount: 41, react: { like: 28, heart: 20, wow: 11 } },
  { id: 205, to: 'Sowon', msgCount: 39, react: { like: 23, heart: 17, wow: 9 } },
  { id: 206, to: 'Sowon', msgCount: 29, react: { like: 16, heart: 11, wow: 5 } },
];

export default function List() {
  const nav = useNavigate();

  const popular = useMemo(() => popularData, []);
  const recent = useMemo(() => recentData, []);

  return (
    <main className="page page-list">
      <section className="section">
        <header className="section-head">
          <h2 className="title">인기 롤링 페이퍼 🔥</h2>
        </header>
        <SlideRow
          items={popular}
          onClickCard={(id) => nav(`/post/${id}`)}
        />
      </section>

      <section className="section">
        <header className="section-head">
          <h2 className="title">최근에 만든 롤링 페이퍼 ✨</h2>
        </header>
        <SlideRow
          items={recent}
          onClickCard={(id) => nav(`/post/${id}`)}
        />
      </section>

      <div className="cta-wrap">
        <button className="cta" type="button" onClick={() => nav('/post')}>
          나도 만들어보기
        </button>
      </div>
    </main>
  );
}

/**
 * SlideRow
 * - 화면엔 항상 4장만 보이도록 카드 폭을 25%로 고정
 * - 버튼 클릭 시 인덱스를 1씩 이동 → 한 장씩 밀려 나오는 애니메이션
 * - 첫 순서: 왼쪽 버튼 숨김 / 마지막 순서: 오른쪽 버튼 숨김
 * - 4개 미만: 양쪽 버튼 숨김, 좌측부터 채움
 */
function SlideRow({
  items,
  onClickCard,
}: {
  items: CardItem[];
  onClickCard: (id: number | string) => void;
}) {
  const VISIBLE = 4; // PC에서 4장 고정
  const [idx, setIdx] = useState(0); // 현재 왼쪽 첫 카드 index

  const maxIdx = Math.max(0, items.length - VISIBLE);
  const canLeft = idx > 0;
  const canRight = idx < maxIdx;

  const go = (dir: 1 | -1) => {
    setIdx((v) => Math.min(Math.max(0, v + dir), maxIdx));
  };

  return (
    <div className="cards-row slide-mode">
      {canLeft && (
        <ArrowButton
          direction="left"
          size="small"
          onClick={() => go(-1)}
          aria-label="이전"
          className="arrow left"
        />
      )}

      <div className="viewport slide">
        <div
          className="track slide"
          style={{ transform: `translateX(calc(-${idx} * (100% + 16px) / 4))` }}
        >
          {items.map((card) => (
            <article
              key={card.id}
              className="roll-card slide-item"
              onClick={() => onClickCard(card.id)}
              role="button"
              tabIndex={0}
            >
              <div className="card-surface">
                <div className="card-head">
                  <strong className="to">To. {card.to}</strong>
                  <span className="badge">+27</span>
                </div>

                <div className="meta">
                  <span className="circle c1" />
                  <span className="circle c2" />
                  <span className="circle c3" />
                  <span className="plus">+30</span>
                </div>

                <p className="sub">{card.msgCount}명이 작성했어요!</p>

                <div className="divider" />

                <div className="stats glass">
                  <span>👍 {card.react.like}</span>
                  <span>😊 {card.react.heart}</span>
                  <span>👏 {card.react.wow}</span>
                </div>

                <span className="decor decor-blob-1" />
                <span className="decor decor-blob-2" />
                <span className="decor decor-ring" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {canRight && (
        <ArrowButton
          direction="right"
          size="small"
          onClick={() => go(1)}
          aria-label="다음"
          className="arrow right"
        />
      )}
    </div>
  );
}