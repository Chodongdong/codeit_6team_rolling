import emojiMap from "../BadgeEmoji/BadgeEmoji";

// 작성자 아바타 정보(임시) - 추후 API 응답 모델과 맞출 예정
export interface Avatar {
  id: number;
  src: string;
  alt?: string;
}

// 리액션 카운트(임시) - 추후 API 응답 모델과 맞출 예정
export type EmojiKey = keyof typeof emojiMap; // BadgeEmoji.tsx에서 emojiMap 추출
export interface Reaction {
  id: string; // reaction 고유 id
  type: EmojiKey; // emojiMap key와 매칭 ("thumbsUp" | "love" ...)
  count: number; // 몇 명이 눌렀는지
}

export interface HeaderProps {
  showCreateButton?: boolean; // 롤링 페이퍼 만들기 버튼 노출 여부
  showServiceMeta?: boolean; // service 헤더 영역 노출 여부

  recipient?: string; // 수취인 이름
  avatars?: Avatar[]; // 작성자 아바타 리스트
  totalWriters?: number; // 작성자 수
  reactions?: Reaction[]; // 리액션 데이터
}
