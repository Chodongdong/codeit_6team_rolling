import React from "react";
import "./CardList.css";
import BadgeEmoji from "../BadgeEmoji/BadgeEmoji";
import profile1 from "../../../assets/profile1.png";
import profile2 from "../../../assets/profile2.png";
import profile3 from "../../../assets/profile3.png";


/*
프로필 옆에 숫자는 프로필 개수가 늘수록 숫자도 늘어요!
사용법
<CardList varint = "set1">
지금은 set1,set2,set3 이렇게 코드를 작성해뒀어요. 거기서 원하는 값 꺼내서 사용하면 될 것 같습니다.
가로로 여러개가 들어갈때 80번대줄에 있는 set1,set2,set3에 원하는 데이터 넣고 사용하면 됩니다.
4개를 원할시 4개의 데이터를 set1에 넣고 위에 코드를 사용하면 4개 코드가 가로로 들어갑니다.
*/ 

type ReactionType = "thumbsUp" | "love" | "party" | "fourLeafClover";

interface Reaction {
  icon: ReactionType;
  count: number;
}

interface CardProps {
  title: string;
  subtitle: string;
  profiles: string[];
  countText: string;
  reactions: Reaction[];
  background: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  profiles,
  countText,
  reactions,
  background,
}) => {
  const isImage = background.startsWith("url(");

  return (
    <div
      className="card"
      style={{
        background: isImage ? background : background,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h4 className="card-title">{title}</h4>

      <div className="profile-list">
        {profiles.slice(0, 3).map((src, idx) => (
          <img key={idx} src={src} alt="profile" className="profile-img" />
        ))}
        {profiles.length > 3 && (
          <div className="profile-extra">+{profiles.length - 3}</div>
        )}
      </div>

      <p className="card-subtitle">
        <strong>{subtitle}</strong> {countText}
      </p>

      <div className="divider"></div>

      <div className="reaction-list">
        {reactions.map((r, idx) => (
          <BadgeEmoji key={idx} emoji={r.icon} count={r.count} />
        ))}
      </div>
    </div>
  );
};

// 공통 CardList 컴포넌트
interface CardListProps {
  variant?: "set1" | "set2" | "set3"; // 어떤 카드 세트를 보여줄지
}

const CardList: React.FC<CardListProps> = ({ variant = "set1" }) => {
  let data: CardProps[] = [];

  // variant 값에 따라 다른 데이터 세트 로드
  if (variant === "set1") {
    data = [
      {
        title: "To. Sowon",
        subtitle: "30명",
        profiles: [profile1, profile2, profile3,"/assets/profiles/profile4.png"],
        countText: "이 작성했어요!",
        reactions: [
          { icon: "thumbsUp", count: 20 },
          { icon: "love", count: 12 },
          { icon: "party", count: 7 },
        ],
        background: "#EEDBFF",
      },
      {
        title: "To. Sowon",
        subtitle: "30명",
        profiles: [profile1, profile2, profile3,"/assets/profiles/profile4.png"],
        countText: "이 작성했어요!",
        reactions: [
          { icon: "thumbsUp", count: 20 },
          { icon: "love", count: 12 },
          { icon: "party", count: 7 },
        ],
        background: "#EEDBFF",
      },
      {
        title: "To. Sowon",
        subtitle: "30명",
        profiles: [profile1, profile2, profile3,"/assets/profiles/profile4.png"],
        countText: "이 작성했어요!",
        reactions: [
          { icon: "thumbsUp", count: 20 },
          { icon: "love", count: 12 },
          { icon: "party", count: 7 },
        ],
        background: "#EEDBFF",
      },
      {
        title: "To. Sowon",
        subtitle: "30명",
        profiles: [profile1, profile2, profile3,"/assets/profiles/profile4.png"],
        countText: "이 작성했어요!",
        reactions: [
          { icon: "thumbsUp", count: 20 },
          { icon: "love", count: 12 },
          { icon: "party", count: 7 },
        ],
        background: "#EEDBFF",
      },
      {
        title: "To. Sowon",
        subtitle: "30명",
        profiles: [profile1, profile2, profile3,"/assets/profiles/profile4.png"],
        countText: "이 작성했어요!",
        reactions: [
          { icon: "thumbsUp", count: 20 },
          { icon: "love", count: 12 },
          { icon: "party", count: 7 },
        ],
        background: "#EEDBFF",
      },
      {
        title: "To. Sowon",
        subtitle: "30명",
        profiles: [profile1, profile2, profile3,"/assets/profiles/profile4.png"],
        countText: "이 작성했어요!",
        reactions: [
          { icon: "thumbsUp", count: 20 },
          { icon: "love", count: 12 },
          { icon: "party", count: 7 },
        ],
        background: "#EEDBFF",
      },
      {
        title: "To. Sowon",
        subtitle: "30명",
        profiles: [profile1, profile2, profile3,"/assets/profiles/profile4.png"],
        countText: "이 작성했어요!",
        reactions: [
          { icon: "thumbsUp", count: 20 },
          { icon: "love", count: 12 },
          { icon: "party", count: 7 },
        ],
        background: "#EEDBFF",
      },
      {
        title: "To. Sowon",
        subtitle: "30명",
        profiles: [profile1, profile2, profile3,"/assets/profiles/profile4.png"],
        countText: "이 작성했어요!",
        reactions: [
          { icon: "thumbsUp", count: 20 },
          { icon: "love", count: 12 },
          { icon: "party", count: 7 },
        ],
        background: "#EEDBFF",
      },
    ];
  } else if (variant === "set2") {
    data = [
      {
        title: "To. Minjun",
        subtitle: "45명",
        profiles: [profile1, profile2, profile3],
        countText: "이 작성했어요!",
        reactions: [
          { icon: "thumbsUp", count: 25 },
          { icon: "love", count: 16 },
          { icon: "party", count: 9 },
        ],
        background: "#FFF2CC",
      },
    ];
  } else if (variant === "set3") {
    data = [
      {
        title: "To. Taewoo",
        subtitle: "50명",
        profiles: [profile1, profile2, profile3],
        countText: "이 작성했어요!",
        reactions: [
          { icon: "thumbsUp", count: 33 },
          { icon: "love", count: 2 },
          { icon: "party", count: 10 },
        ],
        background: "#CCE5FF",
      },
    ];
  }

  return (
    <div className="card-container">
      {data.map((item, idx) => (
        <Card key={idx} {...item} />
      ))}
    </div>
  );
};

export default CardList;
