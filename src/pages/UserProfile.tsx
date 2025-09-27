import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();
  return <div>사용자 프로필: {userId}</div>;
}