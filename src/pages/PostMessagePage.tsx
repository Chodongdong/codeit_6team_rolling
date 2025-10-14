import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// ✅ 공용 컴포넌트
import Dropdown from "../components/common/Dropdown/Dropdown";
import Button from "../components/common/buttons/button";
import Input from "../components/common/Input/Input";

// ✅ 외부 라이브러리
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// ✅ 리소스 및 스타일
import personIcon from "../assets/person.svg";
import "../designSystem/utilities/utilities.css";
import "./PostMessagePage.css";

// =======================================================
// 상수
// =======================================================
const BASE_URL = "https://rolling-api.vercel.app";
const TEAM_NAME = "19-6"; // 고정된 팀 이름

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
// 타입
// =======================================================
interface FormData {
  from: string;
  relation: string;
  font: string;
  message: string;
  profileImage: string;
}

// =======================================================
// 메인 컴포넌트
// =======================================================
export default function PostMessagePage() {
  const { id } = useParams();
  // const [recipientId, setRecipientId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    from: "",
    relation: "지인",
    font: "Noto Sans",
    message: "",
    profileImage: personIcon,
  });

  const [profileImages, setProfileImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<{ from?: string }>({});

  // =======================================================
  // 1️⃣ 프로필 이미지 불러오기
  // =======================================================
  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile-images/`);
        if (Array.isArray(res.data.imageUrls)) {
          setProfileImages(res.data.imageUrls);
          setFormData((prev) => ({
            ...prev,
            profileImage: res.data.imageUrls[0],
          }));
        }
      } catch (err) {
        console.error("❌ 프로필 이미지 불러오기 실패:", err);
      }
    };
    fetchProfileImages();
  }, []);

  // =======================================================
  // 2️⃣ 기존 recipient 불러오기 (자동 생성 X)
  // =======================================================
  useEffect(() => {
    if (!id) return;
    const fetchRecipient = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/${TEAM_NAME}/recipients/${id}/`
        );
        console.log("✅ recipient 불러오기 성공:", res.data);

        if (res.data?.id) {
          // setRecipientId(res.data.id);
        }
      } catch (err) {
        console.warn("⚠️ 존재하지 않는 recipient입니다:", err);
        // setRecipientId(null);
      }
    };

    fetchRecipient();
  }, [id]);

  // =======================================================
  // 3️⃣ 입력 핸들러
  // =======================================================
  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "from" && typeof value === "string" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, from: undefined }));
    }
  };

  // =======================================================
  // 4️⃣ 메시지 전송 핸들러
  // =======================================================
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // recipient 존재하지 않으면 콘솔에만 로그 남기고 중단
    if (!id) {
      console.error(
        "❌ recipient가 존재하지 않습니다. 메시지를 보낼 수 없습니다."
      );
      return;
    }

    if (!formData.from.trim()) {
      setErrors({ from: "이름을 입력해 주세요." });
      return;
    }

    if (!formData.message.trim()) {
      alert("메시지를 입력해 주세요!");
      return;
    }

    const postData = {
      // team: TEAM_NAME,
      // recipientId,
      sender: formData.from,
      profileImageURL: formData.profileImage,
      relationship: formData.relation,
      content: formData.message,
      font: formData.font,
    };

    console.log("📤 전송 데이터:", postData);

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/${TEAM_NAME}/recipients/${id}/messages/`,
        postData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ 전송 성공:", res.data);

      navigate(`/post/${id}`, { replace: true });

      setSuccessMessage(`🎉 메시지 생성 완료! (ID: ${res.data.id})`);
      setFormData((prev) => ({ ...prev, from: "", message: "" }));
    } catch (err) {
      // recipient가 존재하지 않아 서버에서 404 발생 시
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        console.error(
          "❌ recipient를 찾을 수 없습니다. 존재하지 않는 recipient입니다."
        );
      } else {
        console.error("❌ 메시지 생성 중 오류 발생:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // 렌더링
  // =======================================================
  return (
    <div className="post-message-page">
      <main className="post-message-container">
        <form className="message-form" onSubmit={handleSubmit}>
          {/* From */}
          <div className="form-group">
            <label htmlFor="from" className="f-24b">
              From.
            </label>
            <Input
              id="from"
              value={formData.from}
              onChange={(e) => handleChange("from", e.target.value)}
              placeholder="이름을 입력해 주세요"
              className={`f-16r ${errors.from ? "error" : ""}`}
            />
            {errors.from && (
              <span className="error-text f-14r">{errors.from}</span>
            )}
          </div>

          {/* 프로필 이미지 */}
          <div className="form-group">
            <label className="f-24b">프로필 이미지</label>
            <div className="profile-section">
              {profileImages.length > 0 ? (
                <>
                  <div
                    className={`profile-item-large ${
                      formData.profileImage === profileImages[0]
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleChange("profileImage", profileImages[0])
                    }
                  >
                    <img
                      src={profileImages[0] || personIcon}
                      alt="기본 이미지"
                    />
                  </div>
                  <div className="profile-right">
                    <p className="profile-hint f-14r text-muted">
                      프로필 이미지를 선택해 주세요!
                    </p>
                    <div className="profile-list">
                      {profileImages.slice(1).map((url, index) => (
                        <div
                          key={url}
                          className={`profile-item ${
                            formData.profileImage === url ? "selected" : ""
                          }`}
                          onClick={() => handleChange("profileImage", url)}
                        >
                          <img src={url} alt={`프로필 ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p>🌀 프로필 이미지를 불러오는 중...</p>
              )}
            </div>
          </div>

          {/* 관계 선택 */}
          <div className="form-group">
            <label className="f-24b">상대와의 관계</label>
            <Dropdown
              options={RELATION_OPTIONS}
              placeholder="선택하세요"
              onSelect={(value) => handleChange("relation", value)}
            />
          </div>

          {/* 메시지 본문 */}
          <div className="form-group">
            <label className="f-24b">내용을 입력해 주세요</label>
            <ReactQuill
              theme="snow"
              value={formData.message}
              onChange={(value) => handleChange("message", value)}
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
              onSelect={(value) => handleChange("font", value)}
            />
          </div>

          {/* 버튼 */}
          <Button
            type="submit"
            variant="primary"
            className="full-width-btn f-20b"
            disabled={loading || !formData.message.trim()}
          >
            {loading ? "생성 중..." : "메시지 보내기"}
          </Button>

          {successMessage && (
            <p className="success-text f-16b" style={{ color: "green" }}>
              {successMessage}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
