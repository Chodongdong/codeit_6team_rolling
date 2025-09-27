import { useParams } from "react-router-dom";

export default function UserSettings() {
  const { userId } = useParams();
  return <div>사용자 설정: {userId}</div>;
}