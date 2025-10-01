/**
 * 프로필 이미지를 보여주는 아바타 컴포넌트
 *
 * @example
 * // 기본 (아이콘)
 * <Avatar />
 *
 * @example
 * // 선택된 이미지 있을 때
 * <Avatar src="src/assets/profile/p1.jpg" />
 *
 * @example
 * // 크기 변경 가능
 * <Avatar src="src/assets/profile/p2.jpg" size={56} />
 */

import "./Avatar.css";

interface AvatarProps {
  src?: string; // 선택된 프로필 이미지 (없으면 기본 아이콘)
  size?: number; // 아바타 크기 (기본 80px)
  alt?: string;
}

const Avatar = ({ src, size = 80, alt = "프로필" }: AvatarProps) => {
  return (
    <div className="Avatar" style={{ width: size, height: size }}>
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <img
          src="assets/person.svg"
          alt="기본 프로필"
          className="Avatar__placeholder"
        />
      )}
    </div>
  );
};

export default Avatar;
