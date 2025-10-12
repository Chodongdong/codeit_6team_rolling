import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ToggleButton from "../components/common/ToggleButton/ToggleButton";
import Input from "../components/common/Input/Input";
import "./Post.css";

/**
 * 📌 Post.tsx (최종 안정 버전)
 * 롤링페이퍼 생성 페이지
 * - To. 이름 입력
 * - 배경 선택 (컬러 / 이미지)
 * - API 연동: https://rolling-api.vercel.app
 */

const BASE_URL = "https://rolling-api.vercel.app";
const TEAM_NAME = "codeit";

// 
const COLORS = ["beige", "purple", "blue", "green"];

const COLOR_MAP: Record<string, string> = {
  beige: "#FFF2CC",
  purple: "#EEDBFF",
  blue: "#CCE5FF",
  green: "#D3F4D1",
};

const Post: React.FC = () => {
  const [mode, setMode] = useState<"컬러" | "이미지">("컬러");
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * ✅ 배경 이미지 불러오기
   */
  useEffect(() => {
    const fetchBackgroundImages = async () => {
      try {
        const res = await fetch(`${BASE_URL}/background-images/`);
        const data = await res.json();

        if (data.imageUrls && Array.isArray(data.imageUrls)) {
          setImageUrls(data.imageUrls);
          console.log("✅ 배경 이미지 목록 불러오기 성공:", data.imageUrls);
        } else {
          console.warn("⚠️ imageUrls 형식이 올바르지 않습니다:", data);
        }
      } catch (error) {
        console.error("❌ 배경 이미지 불러오기 실패:", error);
      }
    };

    fetchBackgroundImages();
  }, []);

  /**
   * 롤링페이퍼 생성 핸들러
   *  recipient 생성 →  message 등록
   */
  const handleCreate = async () => {
    const recipientName = inputRef.current?.value?.trim() || "";
    if (!recipientName) {
      alert("받는 사람 이름을 입력해 주세요!");
      return;
    }

    if (selected === null) {
      alert("배경을 선택해 주세요!");
      return;
    }

    try {
      setLoading(true);

      // ✅ 1️⃣ recipient 생성 요청 데이터 구성
      const recipientPayload: any = {
        team: TEAM_NAME,
        name: recipientName,
        // 🔹 서버가 필수로 요구하는 필드
        backgroundColor:
          mode === "컬러" ? COLORS[selected] : COLORS[0], // 이미지일 때도 기본 beige
      };

      if (mode === "이미지") {
        recipientPayload.backgroundImageURL = imageUrls[selected];
      }

      const recipientRes = await axios.post(
        `${BASE_URL}/${TEAM_NAME}/recipients/`,
        recipientPayload
      );

      const recipientId = recipientRes.data.id;
      console.log("✅ Recipient 생성 완료:", recipientRes.data);

      // ✅ 2️⃣ message 생성
      const messagePayload = {
        team: TEAM_NAME,
        recipientId,
        sender: "강호동",
        profileImageURL: "https://example.com/profile1.png",
        relationship: "친구",
        content: `To. ${recipientName}님 🎉 축하드립니다!`,
        font: "Pretendard",
      };

      const messageRes = await axios.post(
        `${BASE_URL}/${TEAM_NAME}/recipients/${recipientId}/messages/`,
        messagePayload
      );

      console.log("✅ 메시지 등록 완료:", messageRes.data);
      alert(`롤링페이퍼 생성 완료!\nID: ${recipientId}`);
    } catch (error: any) {
      console.error("❌ 생성 중 오류 발생:", error.response?.data || error.message);
      if (error.response?.data) {
        alert(`오류 발생:\n${JSON.stringify(error.response.data, null, 2)}`);
      } else {
        alert("롤링페이퍼 생성 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-wrapper">
      <div className="post-container">
        {/* To. 입력 */}
        <div className="input-section">
          <label className="input-label">To.</label>
          <Input ref={inputRef} placeholder="받는 사람 이름을 입력해 주세요" />
        </div>

        {/* 안내 문구 */}
        <div className="subtitle-section">
          <h3>배경화면을 선택해 주세요.</h3>
          <p>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
        </div>

        {/* 토글 버튼 */}
        <div className="toggle-section">
          <ToggleButton
            options={["컬러", "이미지"]}
            value={mode}
            onValueChange={(v) => setMode(v as "컬러" | "이미지")}
          />
        </div>

        {/* 배경 선택 그리드 */}
        <div className="select-grid">
          {mode === "컬러"
            ? COLORS.map((color, idx) => (
                <div
                  key={idx}
                  className={`select-box ${selected === idx ? "selected" : ""}`}
                  style={{ backgroundColor: COLOR_MAP[color] }}
                  onClick={() => setSelected(idx)}
                >
                  {selected === idx && <div className="check-icon">✓</div>}
                </div>
              ))
            : imageUrls.length > 0 ? (
                imageUrls.map((url, idx) => (
                  <div
                    key={idx}
                    className={`select-box ${selected === idx ? "selected" : ""}`}
                    onClick={() => setSelected(idx)}
                  >
                    <img src={url} alt={`bg-${idx}`} className="image-thumb" />
                    {selected === idx && (
                      <div className="check-overlay">
                        <div className="check-icon">✓</div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>🌀 배경 이미지를 불러오는 중...</p>
              )}
        </div>

        {/* 생성 버튼 */}
        <button className="create-btn" onClick={handleCreate} disabled={loading}>
          {loading ? "생성 중..." : "생성하기"}
        </button>
      </div>
    </div>
  );
};

export default Post;
