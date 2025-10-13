import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// ✅ 공용 컴포넌트
import Header from "../components/common/Header/Header";
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

interface FormData {
  from: string;
  relation: string;
  font: string;
  message: string;
  profileImage: string;
}

const PostMessagePage: React.FC = () => {
  const { recipientId = "1" } = useParams<{ recipientId: string }>();

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

  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        const res = await axios.get(
          "https://rolling-api.vercel.app/profile-images/"
        );
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

  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "from" && typeof value === "string" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, from: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.from.trim()) {
      setErrors({ from: "값을 입력해 주세요." });
      return;
    }

    const postData = {
      team: "6",
      recipientId: Number(recipientId),
      sender: formData.from,
      profileImageURL: formData.profileImage,
      relationship: formData.relation,
      content: formData.message,
      font: formData.font,
    };

    try {
      setLoading(true);
      const res = await axios.post(
        `https://rolling-api.vercel.app/6/recipients/${recipientId}/messages/`,
        postData,
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccessMessage(`롤링페이퍼가 생성되었습니다! (ID: ${res.data.id})`);
      setFormData((prev) => ({ ...prev, from: "", message: "" }));
    } catch (err) {
      console.error("❌ 요청 실패:", err);
      alert("메시지 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-message-page">
      <Header />
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
              <div
                className={`profile-item-large ${formData.profileImage === profileImages[0] ? "selected" : ""}`}
                onClick={() => handleChange("profileImage", profileImages[0])}
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
                      key={url}
                      className={`profile-item ${formData.profileImage === url ? "selected" : ""}`}
                      onClick={() => handleChange("profileImage", url)}
                    >
                      <img src={url} alt={`프로필 ${index + 1}`} />
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
            {loading ? "생성 중..." : "생성하기"}
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
};

export default PostMessagePage;
