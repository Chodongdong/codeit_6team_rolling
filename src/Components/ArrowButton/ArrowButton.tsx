import React from "react";

interface ArrowButtonProps {
  direction?: "left" | "right"; // 화살표 방향
  onClick?: () => void; // 클릭 이벤트
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction = "left",
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 클릭 시 기본 동작 방지
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      style={{
        width: "56px",
        height: "56px",
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* 배경 원형 SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <foreignObject x="0" y="0" width="56" height="56">
          <div
            style={{
              backdropFilter: "blur(2px)",
              clipPath: "url(#bgblur_0_1_1383_clip_path)",
              width: "100%",
              height: "100%",
            }}
          ></div>
        </foreignObject>
        <g filter="url(#filter0_d_1_1383)">
          <circle cx="28" cy="24" r="20" fill="white" fillOpacity={0.9} />
          <circle cx="28" cy="24" r="19.5" stroke="#CCCCCC" />
        </g>
        <defs>
          <filter
            id="filter0_d_1_1383"
            x="0"
            y="0"
            width="56"
            height="56"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1_1383"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1_1383"
              result="shape"
            />
          </filter>
          <clipPath id="bgblur_0_1_1383_clip_path">
            <circle cx="28" cy="24" r="20" />
          </clipPath>
        </defs>
      </svg>

      {/* 작은 화살표 SVG (중앙 정렬) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform:
            direction === "left"
              ? "translate(-50%, -50%) rotate(180deg)"
              : "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        <path
          d="M5.53846 14L12 8L5.53846 2"
          stroke="#181818"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default ArrowButton;
