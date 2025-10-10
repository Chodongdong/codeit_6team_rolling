// src/pages/PostMessagePage.tsx
import React, { useState, useEffect, useRef } from "react";

// ✅ 공용 컴포넌트 import
import Header from "../components/common/Header/Header";
import Dropdown from "../components/common/Dropdown/Dropdown";
import Button from "../components/common/buttons/button";
import Input from "../components/common/Input/Input";

// ✅ 외부 라이브러리 (Quill Editor)
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// ✅ 리소스 및 스타일
import personIcon from "../assets/person.svg";
import "../designSystem/utilities/utilities.css";
import "./PostMessagePage.css";

// =======================================================
// 상수 정의 영역
// =======================================================
const RELATION_OPTIONS = ["지인", "친구", "가족", "동료"];
const FONT_OPTIONS = ["Noto Sans", "Pretendard", "Nanum Gothic"];

const TOOLBAR_MODULES = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const TOOLBAR_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "link",
];

// =======================================================
// 메인 컴포넌트
// =======================================================
const PostMessagePage = () => {
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const [fromError, setFromError] = useState(false);
  const [relation, setRelation] = useState("지인");
  const [font, setFont] = useState("Noto Sans");
  const [message, setMessage] = useState("");
  const [profileImages, setProfileImages] = useState<string[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>(personIcon);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // =======================================================
  // 1️⃣ 프로필 이미지 목록 불러오기
  // =======================================================
  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        const res = await fetch(
          "https://rolling-api.vercel.app/profile-images/"
        );
        const data = await res.json();
        console.log("✅ 프로필 이미지 목록:", data);

        if (data.imageUrls && Array.isArray(data.imageUrls)) {
          setProfileImages(data.imageUrls);
          setSelectedProfile(data.imageUrls[0]);
        }
      } catch (err) {
        console.error("❌ 프로필 이미지 불러오기 실패:", err);
      }
    };
    fetchProfileImages();
  }, []);

  // =======================================================
  // 2️⃣ 메시지 생성 (POST)
  // =======================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const inputEl = inputContainerRef.current?.querySelector("input");
    const fromName = inputEl?.value.trim() ?? "";

    if (!fromName) {
      setFromError(true);
      return;
    }

    // ✅ Swagger MessageCreate 모델 기반 Body
    const postData = {
      team: "team6",
      recipientId: 1, // 실제 recipient ID로 교체 가능
      sender: fromName,
      profileImageURL: selectedProfile,
      relationship: relation,
      content: message,
      font,
    };

    console.log("📤 전송 데이터:", postData);

    try {
      setLoading(true);

      const res = await fetch(
        "https://rolling-api.vercel.app/team6/recipients/1/messages/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        }
      );

      console.log("🛬 응답 상태:", res.status);
      const responseText = await res.text();
      console.log("🛬 응답 본문:", responseText);

      if (!res.ok) {
        throw new Error(`서버 응답 오류 (${res.status}): ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log("✅ 메시지 생성 성공:", data);

      setSuccessMessage(
        `롤링페이퍼가 성공적으로 생성되었습니다! (ID: ${data.id})`
      );
    } catch (err) {
      console.error("❌ 요청 실패:", err);
      alert("메시지 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // 3️⃣ UI 렌더링
  // =======================================================
  return (
    <div className="post-message-page">
      <Header />

      <main className="post-message-container">
        <form className="message-form" onSubmit={handleSubmit}>
          {/* From 입력 */}
          <div className="form-group" ref={inputContainerRef}>
            <label htmlFor="from" className="f-24b">
              From.
            </label>
            <Input
              id="from"
              placeholder="이름을 입력해 주세요"
              onBlur={(e) => {
                if (!e.target.value.trim()) setFromError(true);
                else setFromError(false);
              }}
              className={`f-16r ${fromError ? "error" : ""}`}
            />
            {fromError && (
              <span className="error-text f-14r">값을 입력해 주세요.</span>
            )}
          </div>

          {/* 프로필 이미지 선택 */}
          <div className="form-group">
            <label className="f-24b">프로필 이미지</label>
            <div className="profile-section">
              <div
                className={`profile-item-large ${
                  selectedProfile === profileImages[0] ? "selected" : ""
                }`}
                onClick={() => setSelectedProfile(profileImages[0])}
              >
                <img src={profileImages[0] || personIcon} alt="기본 이미지" />
              </div>

              <div className="profile-right">
                <p className="profile-hint f-14r text-muted">
                  프로필 이미지를 선택해 주세요!
                </p>
                <div className="profile-list">
                  {profileImages.slice(1).map((url, index) => (
                    <div
                      key={index}
                      className={`profile-item ${
                        selectedProfile === url ? "selected" : ""
                      }`}
                      onClick={() => setSelectedProfile(url)}
                    >
                      <img src={url} alt={`프로필 ${index + 2}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 관계 선택 */}
          <div className="form-group">
            <label className="f-24b">상대와의 관계</label>
            <Dropdown
              options={RELATION_OPTIONS}
              placeholder="선택하세요"
              onSelect={(value) => setRelation(value)}
            />
          </div>

          {/* 메시지 본문 */}
          <div className="form-group">
            <label className="f-24b">내용을 입력해 주세요</label>
            <ReactQuill
              theme="snow"
              value={message}
              onChange={setMessage}
              modules={TOOLBAR_MODULES}
              formats={TOOLBAR_FORMATS}
              placeholder="메시지를 입력하세요..."
            />
          </div>

          {/* 폰트 선택 */}
          <div className="form-group">
            <label className="f-24b">폰트 선택</label>
            <Dropdown
              options={FONT_OPTIONS}
              placeholder="선택하세요"
              onSelect={(value) => setFont(value)}
            />
          </div>

          {/* 생성 버튼 */}
          <Button
            type="submit"
            variant="primary"
            className="full-width-btn f-20b"
            disabled={loading || !message.trim()}
          >
            {loading ? "생성 중..." : "생성하기"}
          </Button>

          {/* 성공 메시지 */}
          {successMessage && (
            <p className="success-text f-16b" style={{ color: "green" }}>
              {successMessage}
            </p>
          )}
        </form>
      </main>
    </div>
  );
};

// =======================================================
// 기본 export
// =======================================================
export default PostMessagePage;
