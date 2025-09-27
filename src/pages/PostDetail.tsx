import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { postId } = useParams();
  return <div>게시글 상세: {postId}</div>;
}