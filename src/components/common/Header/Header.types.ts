// 작성자 아바타 정보(임시) - 추후 API 응답 모델과 맞출 예정
export interface Avatar {
  id: number;
  src: string;
  alt?: string;
}

// 리액션 카운트(임시) - 추후 API 응답 모델과 맞출 예정
// BadgeEmoji.tsx에서 emojiMap 추출
export interface Reaction {
  id?: number;
  emoji: string; // 서버에서는 `emoji` 또는 `emoji`문자(예: "🥰")
  count: number; // 몇 명이 눌렀는지
}

export interface HeaderProps {
  recipient?: string; // 수취인 이름
  avatars?: Avatar[]; // 작성자 아바타 리스트
  totalWriters?: number; // 작성자 수
  reactions?: Reaction[]; // 리액션 데이터
}
