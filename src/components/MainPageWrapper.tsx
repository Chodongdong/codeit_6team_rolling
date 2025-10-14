import { useParams } from "react-router-dom";
import MainPages from "../pages/MainPages";
import type { BgColor } from "../pages/MainPages";

const MainPageWrapper = () => {
  const { id } = useParams<{ id: string }>();

  // 예: id가 recipientName 역할을 한다고 가정
  const recipientName = id ?? "기본이름"; // fallback 설정
  const externalBgColor: BgColor = "beige"; // 기본 배경색

  return (
    <MainPages
      recipientName={recipientName}
      externalBgColor={externalBgColor}
    />
  );
};

export default MainPageWrapper;
