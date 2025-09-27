import { useParams } from "react-router-dom";

export default function PostEdit() {
  const { postId } = useParams();
  return <div>게시글 수정: {postId}</div>;
}