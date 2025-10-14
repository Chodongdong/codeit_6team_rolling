// src/pages/List.tsx
import { useMemo, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './List.css';

type CardItem = {
  id: number;
  to: string;
  msgCount: number;
  react: { like: number; heart: number; wow: number };
  kind: 'pastel' | 'thumb';
  thumb?: string;
};

/* 인기 섹션: 시안 완성 카드 이미지 4장 (assets 사용 예시)
   파일명/경로가 다르면 아래 import 경로만 변경하면 됨 */
import list1 from '../assets/Type_colors=card_list_01.png';
import list2 from '../assets/Type_colors=card_list_02.png';
import list3 from '../assets/Type_colors=card_list_03.png';
import list4 from '../assets/Type_colors=card_list_04.png';

/* 인기: 완성 이미지 그대로, 각 카드 클릭 시 /post/:id */
const popular: CardItem[] = [
  { id: 101, to: 'Sowon', msgCount: 30, react: { like: 20, heart: 12, wow: 7 }, kind: 'thumb', thumb: list1 },
  { id: 102, to: 'Sowon', msgCount: 30, react: { like: 20, heart: 12, wow: 7 }, kind: 'thumb', thumb: list2 },
  { id: 103, to: 'Sowon', msgCount: 30, react: { like: 20, heart: 12, wow: 7 }, kind: 'thumb', thumb: list3 },
  { id: 104, to: 'Sowon', msgCount: 30, react: { like: 20, heart: 12, wow: 7 }, kind: 'thumb', thumb: list4 },
];

/* 최근: 임시 카드(원하면 썸네일 이미지로 교체 가능) */
const mockRecent: CardItem[] = Array.from({ length: 8 }).map((_, i) => ({
  id: 201 + i,
  to: 'Sowon',
  msgCount: 30,
  react: { like: 20, heart: 12, wow: 7 },
  kind: 'pastel',
}));

export default function List() {
  const nav = useNavigate();

  // PC(>=1024px)에서만 좌/우 화살표, Tablet/Mobile은 터치 스크롤
  const [isPC, setIsPC] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  useEffect(() => {
    const onResize = () => setIsPC(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const recent = useMemo<CardItem[]>(() => mockRecent, []);

  return (
    <main className="page page-list">
      {/* 인기: 이미지 완제품 4장 그대로 클릭 타깃 */}
      <section className="section">
        <header className="section-head">
          <h2 className="title">인기 롤링 페이퍼 🔥</h2>
        </header>
        <CardsRow
          items={popular}
          isPC={isPC}
          onClickCard={(id) => nav(`/post/${id}`)}
          variant="imageOnly"
        />
      </section>

      {/* 최근: 코드로 렌더되는 카드(원하면 이쪽도 이미지로 전환 가능) */}
      <section className="section">
        <header className="section-head">
          <h2 className="title">최근에 만든 롤링 페이퍼 ✨</h2>
        </header>
        <CardsRow
          items={recent}
          isPC={isPC}
          onClickCard={(id) => nav(`/post/${id}`)}
          variant="normal"
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
 * CardsRow
 * - PC: 4장 단위 페이지 이동(좌/우 화살표)
 * - Tablet/Mobile: 가로 터치 스크롤
 * - variant:
 *    - 'imageOnly'  : 배경 이미지(완성 카드)만 렌더, 텍스트/칩은 렌더하지 않음
 *    - 'normal'     : 텍스트/칩을 코드로 렌더
 */
function CardsRow({
  items,
  isPC,
  onClickCard,
  variant = 'normal',
}: {
  items: CardItem[];
  isPC: boolean;
  onClickCard: (id: number) => void;
  variant?: 'imageOnly' | 'normal';
}) {
  const viewRef = useRef<HTMLDivElement>(null);

  const PAGE_SIZE = 4; // PC에서 한 화면 카드 수
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const [page, setPage] = useState(0);

  const showArrows = isPC && items.length >= PAGE_SIZE;
  const isFirst = page === 0;
  const isLast = page === pageCount - 1;

  const go = (dir: 1 | -1) => {
    setPage((p) => Math.min(Math.max(0, p + dir), pageCount - 1));
  };

  useEffect(() => {
    if (!viewRef.current || !isPC) return;
    const width = viewRef.current.clientWidth;
    viewRef.current.scrollTo({ left: page * width, behavior: 'smooth' });
  }, [page, isPC]);

  return (
    <div className="cards-row">
      {showArrows && !isFirst && (
        <button className="arrow left" type="button" aria-label="이전" onClick={() => go(-1)} />
      )}

      <div className={`viewport ${isPC ? 'pc' : 'touch'}`} ref={viewRef}>
        <div className="track">
          {items.map((card) => (
            <article
              key={card.id}
              className={`roll-card ${card.kind}`}
              onClick={() => onClickCard(card.id)}
              role="button"
              tabIndex={0}
            >
              {variant === 'imageOnly' ? (
                // 완성 카드 이미지만(텍스트/칩 렌더 안 함)
                <div
                  className="card-inner thumb image-only"
                  style={{ backgroundImage: `url(${card.thumb})` }}
                  aria-label={`롤링 페이퍼 ${card.id}로 이동`}
                />
              ) : card.kind === 'thumb' ? (
                // 일반 썸네일 카드(텍스트/칩 렌더)
                <div
                  className="card-inner thumb"
                  style={{ backgroundImage: `url(${card.thumb})` }}
                >
                  <strong className="to">To. {card.to}</strong>
                  <div className="meta invert">
                    <span className="avatars">
                      <img src="/profile1.png" alt="" />
                      <img src="/profile2.png" alt="" />
                      <img src="/profile3.png" alt="" />
                      <em>+11</em>
                    </span>
                    <span className="sub">{card.msgCount}명이 작성했어요!</span>
                  </div>
                  <div className="stats glass">
                    <span>👍 {card.react.like}</span>
                    <span>😊 {card.react.heart}</span>
                    <span>👏 {card.react.wow}</span>
                  </div>
                </div>
              ) : (
                // 파스텔 카드(최근용)
                <div className="card-inner pastel">
                  <strong className="to">To. {card.to}</strong>
                  <div className="meta">
                    <span className="avatars">
                      <img src="/profile1.png" alt="" />
                      <img src="/profile2.png" alt="" />
                      <img src="/profile3.png" alt="" />
                      <em>+27</em>
                    </span>
                    <span className="sub">{card.msgCount}명이 작성했어요!</span>
                  </div>
                  <div className="stats">
                    <span>👍 {card.react.like}</span>
                    <span>😊 {card.react.heart}</span>
                    <span>👏 {card.react.wow}</span>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {showArrows && !isLast && (
        <button className="arrow right" type="button" aria-label="다음" onClick={() => go(1)} />
      )}
    </div>
  );
}