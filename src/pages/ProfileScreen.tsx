import { ArrowLeft } from "lucide-react";

export const ProfileScreen = ({
  setCurrentView,
  mentorProfile,
  handleProfileInputChange,
  saveMentorProfile,
}) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
        <button
          onClick={() => setCurrentView("home")}
          className="text-white mb-4 hover:bg-green-600 p-2 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">Create Your Profile</h1>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Full Name
          </label>
          <input
            type="text"
            value={mentorProfile.name}
            onChange={(e) => handleProfileInputChange("name", e.target.value)}
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Professional Title
          </label>
          <input
            type="text"
            value={mentorProfile.title}
            onChange={(e) => handleProfileInputChange("title", e.target.value)}
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
            placeholder="e.g., Senior Executive, Consultant"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Years of Experience
          </label>
          <select
            value={mentorProfile.experience}
            onChange={(e) =>
              handleProfileInputChange("experience", e.target.value)
            }
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
          >
            <option value="">Select experience range</option>
            <option value="20-25 years">20-25 years</option>
            <option value="25-30 years">25-30 years</option>
            <option value="30+ years">30+ years</option>
            <option value="40+ years">40+ years</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Areas of Expertise
          </label>
          <textarea
            value={mentorProfile.expertise}
            onChange={(e) =>
              handleProfileInputChange("expertise", e.target.value)
            }
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none h-32"
            placeholder="Describe your areas of expertise..."
          />
        </div>

        <button
          onClick={saveMentorProfile}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl text-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all"
        >
          Save Profile
        </button>
      </div>
    </div>
  </div>
);
