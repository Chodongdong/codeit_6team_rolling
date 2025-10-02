/**
 * 프로필 이미지를 보여주는 컴포넌트
 *
 * @example
 * // 기본 (아이콘)
 * <ProfileImage />
 *
 * @example
 * // 선택된 이미지 있을 때
 * <ProfileImage src="src/assets/profile/p1.jpg" />
 *
 * @example
 * // 크기 변경 가능
 * <ProfileImage src="src/assets/profile/p2.jpg" size={56} />
 */

import "./ProfileImage.css";

interface ProfileImageProps {
  src?: string; // 선택된 프로필 이미지 (없으면 기본 아이콘)
  size?: number; // 아바타 크기 (기본 80px)
  alt?: string;
}

const ProfileImage = ({ src, size = 80, alt = "프로필" }: ProfileImageProps) => {
  return (
    <div className="ProfileImage" style={{ width: size, height: size }}>
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <img
          src="assets/person.svg"
          alt="기본 프로필"
          className="ProfileImage__placeholder"
        />
      )}
    </div>
  );
};

export default ProfileImage;
