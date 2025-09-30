import React from "react";
import "./CardList.css";

interface CardProps {
  title: string;
  subtitle: string;
  profiles: string[];
  countText: string;
  reactions: { icon: string; count: number }[];
  bgColor: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  profiles,
  countText,
  reactions,
  bgColor,
}) => {
  return (
    <div className="card" style={{ backgroundColor: bgColor }}>
      <h4 className="card-title">{title}</h4>

      {/* 프로필 이미지 */}
      <div className="profile-list">
        {profiles.slice(0, 3).map((src: string, idx: number) => (
          <img key={idx} src={src} alt="profile" className="profile-img" />
        ))}
        {profiles.length > 3 && (
          <div className="profile-extra">+{profiles.length - 3}</div>
        )}
      </div>

      {/* 서브타이틀 */}
      <p className="card-subtitle">
        <strong>{subtitle}</strong> {countText}
      </p>

      <div className="divider"></div>

      {/* 리액션 */}
      <div className="reaction-list">
        {reactions.map((r, idx) => (
          <div key={idx} className="reaction-box">
            <img src={r.icon} alt="reaction" className="reaction-icon" />
            <span>{r.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CardList = () => {
  return (
    <div className="card-container">
      <Card
        title="To. Sowon"
        subtitle="30명"
        profiles={["/assets/profiles/profile1.png","/assets/profiles/profile2.png","/assets/profiles/profile3.png","/assets/profiles/profile4.png"]}
        countText="이 작성했어요!"
        reactions={[
          { icon: "/assets/reactions/like.png", count: 20 },
          { icon: "/assets/reactions/love.png", count: 12 },
          { icon: "/assets/reactions/cry.png", count: 7 },
        ]}
        bgColor="#EEDBFF"
      />
      <Card
        title="To. Sowon"
        subtitle="30명"
        profiles={["/assets/profiles/profile1.png","/assets/profiles/profile2.png","/assets/profiles/profile3.png"]}
        countText="이 작성했어요!"
        reactions={[
          { icon: "/assets/reactions/like.png", count: 20 },
          { icon: "/assets/reactions/love.png", count: 12 },
          { icon: "/assets/reactions/cry.png", count: 7 },
        ]}
        bgColor="#FFF2CC"
      />
      <Card
        title="To. Sowon"
        subtitle="30명"
        profiles={["/assets/profiles/profile2.png","/assets/profiles/profile3.png","/assets/profiles/profile1.png"]}
        countText="이 작성했어요!"
        reactions={[
          { icon: "/assets/reactions/like.png", count: 20 },
          { icon: "/assets/reactions/love.png", count: 12 },
          { icon: "/assets/reactions/cry.png", count: 7 },
        ]}
        bgColor="#CCE5FF"
      />
      <Card
        title="To. Sowon"
        subtitle="30명"
        profiles={["/assets/profiles/profile3.png","/assets/profiles/profile1.png","/assets/profiles/profile2.png"]}
        countText="이 작성했어요!"
        reactions={[
          { icon: "/assets/reactions/like.png", count: 20 },
          { icon: "/assets/reactions/love.png", count: 12 },
          { icon: "/assets/reactions/cry.png", count: 7 },
        ]}
        bgColor="#D9F7D9"
      />
      {/* 이미지 배경 카드 */}
      <Card
        title="To. Sowon"
        subtitle="30명"
        profiles={[
          "./assets/profiles/profile1.png",
          "./assets/profiles/profile2.png",
          "./assets/profiles/profile3.png"
        ]}
        countText="이 작성했어요!"
        reactions={[
          { icon: "/assets/reactions/like.png", count: 20 },
          { icon: "/assets/reactions/love.png", count: 12 },
          { icon: "/assets/reactions/cry.png", count: 7 },
        ]}
        bgColor="url('/assets/bg1.jpg')"
      />
      <Card
        title="To. Sowon"
        subtitle="30명"
        profiles={["/assets/profiles/profile1.png","/assets/profiles/profile2.png","/assets/profiles/profile3.png"]}
        countText="이 작성했어요!"
        reactions={[
          { icon: "/assets/reactions/like.png", count: 20 },
          { icon: "/assets/reactions/love.png", count: 12 },
          { icon: "/assets/reactions/cry.png", count: 7 },
        ]}
        bgColor="url('/assets/bg2.jpg')"
      />
    </div>
  );
};

export default CardList;
