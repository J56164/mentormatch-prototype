import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function ProfileScreen({ setCurrentView }) {
  const { t } = useTranslation();
  const [mentorProfile, setMentorProfile] = useState({
    name: "",
    title: "",
    experience: "",
    expertise: "",
  });

  const handleProfileInputChange = (field, value) => {
    setMentorProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveMentorProfile = () => {
    // Validate required fields
    if (
      !mentorProfile.name ||
      !mentorProfile.title ||
      !mentorProfile.experience ||
      !mentorProfile.expertise
    ) {
      alert(t("profile.error-incomplete-form"));
      return;
    }

    // Save profile (in real app, would send to backend)
    alert(t("success"));
    console.log("Mentor profile saved:", mentorProfile);

    // Navigate back to home or to a success screen
    setCurrentView("home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
          <button
            onClick={() => setCurrentView("home")}
            className="text-white mb-4 hover:bg-green-600 p-2 rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white">
            {t("profile.title")}
          </h1>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              {t("profile.full-name")}
            </label>
            <input
              type="text"
              value={mentorProfile.name}
              onChange={(e) => handleProfileInputChange("name", e.target.value)}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
              placeholder={t("profile.full-name-description")}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              {t("profile.professional-title")}
            </label>
            <input
              type="text"
              value={mentorProfile.title}
              onChange={(e) =>
                handleProfileInputChange("title", e.target.value)
              }
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
              placeholder={t("profile.professional-title-description")}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              {t("profile.years-expertise")}
            </label>
            <select
              value={mentorProfile.experience}
              onChange={(e) =>
                handleProfileInputChange("experience", e.target.value)
              }
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
            >
              <option value="">
                {t("profile.years-expertise-description")}
              </option>
              <option value="20-25 years">
                {t("profile.years-expertise-range.20-25")}
              </option>
              <option value="25-30 years">
                {t("profile.years-expertise-range.25-30")}
              </option>
              <option value="30+ years">
                {t("profile.years-expertise-range.30+")}
              </option>
              <option value="40+ years">
                {t("profile.years-expertise-range.40+")}
              </option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              {t("profile.areas-expertise")}
            </label>
            <textarea
              value={mentorProfile.expertise}
              onChange={(e) =>
                handleProfileInputChange("expertise", e.target.value)
              }
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none h-32"
              placeholder={t("profile.areas-expertise-description")}
            />
          </div>

          <button
            onClick={saveMentorProfile}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl text-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all"
          >
            {t("profile.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
