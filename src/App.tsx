import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  X,
  User,
  Award,
  Briefcase,
  GraduationCap,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { useMockMentors } from "./hooks/useMockMentors";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [userType, setUserType] = useState(null);
  const [currentMentorIndex, setCurrentMentorIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [mentorProfile, setMentorProfile] = useState({
    name: "",
    title: "",
    experience: "",
    expertise: "",
  });

  // Touch/swipe state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Sample mentor data
  const mentors = useMockMentors();

  // Reset mentor index when starting swiping
  const startSwiping = () => {
    setCurrentMentorIndex(0);
    setCurrentView("swiping");
  };

  const handleSwipe = (direction) => {
    const currentMentor = mentors[currentMentorIndex];

    if (direction === "right" && currentMentor) {
      // Add to matches
      setMatches((prev) => {
        // Avoid duplicates
        if (prev.find((m) => m.id === currentMentor.id)) {
          return prev;
        }
        return [...prev, currentMentor];
      });

      // Show match notification
      setTimeout(() => {
        alert("🎉 It's a match! You can now start chatting.");
      }, 300);
    }

    // Move to next mentor
    if (currentMentorIndex < mentors.length - 1) {
      setCurrentMentorIndex(currentMentorIndex + 1);
      setDragOffset({ x: 0, y: 0 }); // Reset card position
    } else {
      // Finished all mentors
      setCurrentView("matches");
    }
  };

  // Touch/Mouse event handlers for swipe
  const handleStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;

    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;

    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        handleSwipe("right");
      } else {
        handleSwipe("left");
      }
    } else {
      // Snap back to center
      setDragOffset({ x: 0, y: 0 });
    }
  };

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
      alert("Please fill in all fields");
      return;
    }

    // Save profile (in real app, would send to backend)
    alert("Profile saved successfully! 🎉");
    console.log("Mentor profile saved:", mentorProfile);

    // Navigate back to home or to a success screen
    setCurrentView("home");
  };

  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
          <GraduationCap className="mx-auto mb-4 text-white" size={60} />
          <h1 className="text-3xl font-bold text-white mb-2">MentorMatch</h1>
          <p className="text-blue-100 text-lg">
            Connect with experienced mentors
          </p>
        </div>

        <div className="p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            I am a...
          </h2>

          <button
            onClick={() => {
              setUserType("mentor");
              setCurrentView("profile");
            }}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl text-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <Award className="inline-block mr-3" size={28} />
            Mentor
            <p className="text-green-100 text-sm font-normal mt-2">
              Share your experience and guide others
            </p>
          </button>

          <button
            onClick={() => {
              setUserType("mentee");
              startSwiping();
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl text-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <User className="inline-block mr-3" size={28} />
            Mentee
            <p className="text-blue-100 text-sm font-normal mt-2">
              Find guidance from experienced professionals
            </p>
          </button>
        </div>
      </div>
    </div>
  );

  const ProfileScreen = () => (
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
              onChange={(e) =>
                handleProfileInputChange("title", e.target.value)
              }
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

  const SwipingScreen = () => {
    const currentMentor = mentors[currentMentorIndex];

    if (!currentMentor) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              All Done! 🎉
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              You've reviewed all available mentors.
            </p>
            <button
              onClick={() => setCurrentView("matches")}
              className="bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              View Your Matches ({matches.length})
            </button>
          </div>
        </div>
      );
    }

    const cardStyle = {
      transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${
        dragOffset.x * 0.1
      }deg)`,
      transition: isDragging ? "none" : "transform 0.3s ease-out",
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-md mx-auto">
          <div
            ref={cardRef}
            style={cardStyle}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          >
            <div className="relative">
              <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <User size={80} className="text-gray-400" />
              </div>
              <div className="absolute top-4 left-4">
                <button
                  onClick={() => setCurrentView("home")}
                  className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50"
                >
                  <ArrowLeft size={20} />
                </button>
              </div>

              {/* Swipe indicators */}
              {Math.abs(dragOffset.x) > 50 && (
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    dragOffset.x > 0 ? "bg-green-500" : "bg-red-500"
                  } bg-opacity-20`}
                >
                  <div
                    className={`text-6xl font-bold ${
                      dragOffset.x > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {dragOffset.x > 0 ? "❤️" : "✗"}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentMentor.name}
                </h2>
                <span className="text-lg text-gray-600">
                  {currentMentor.age} years
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center text-blue-600 mb-2">
                  <Briefcase size={20} className="mr-2" />
                  <span className="text-lg font-semibold">
                    {currentMentor.title}
                  </span>
                </div>
                <p className="text-gray-600 text-base">
                  {currentMentor.experience}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                  Specialties:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentMentor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-700 text-base leading-relaxed">
                {currentMentor.bio}
              </p>
            </div>
          </div>

          <div className="flex justify-center space-x-8">
            <button
              onClick={() => handleSwipe("left")}
              className="bg-white p-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
            >
              <X size={32} className="text-red-500" />
            </button>

            <button
              onClick={() => handleSwipe("right")}
              className="bg-white p-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
            >
              <Heart size={32} className="text-green-500" />
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-lg">
              {currentMentorIndex + 1} of {mentors.length} mentors
            </p>
            <div className="flex justify-center mt-2 space-x-2">
              {mentors.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentMentorIndex
                      ? "bg-blue-500"
                      : index < currentMentorIndex
                      ? "bg-gray-400"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MatchesScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
          <button
            onClick={() => setCurrentView("home")}
            className="text-white mb-4 hover:bg-purple-600 p-2 rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white">
            Your Matches ({matches.length})
          </h1>
        </div>

        <div className="p-6">
          {matches.length === 0 ? (
            <div className="text-center py-12">
              <Heart size={60} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">No matches yet</p>
              <p className="text-gray-500 mb-6">
                Keep swiping to find mentors!
              </p>
              <button
                onClick={startSwiping}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600"
              >
                Start Swiping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((mentor) => (
                <div
                  key={mentor.id}
                  className="bg-gray-50 rounded-2xl p-4 flex items-center space-x-4"
                >
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <User size={32} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {mentor.name}
                    </h3>
                    <p className="text-gray-600">{mentor.title}</p>
                  </div>
                  <button className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600">
                    <MessageCircle size={20} />
                  </button>
                </div>
              ))}

              <div className="text-center pt-4">
                <button
                  onClick={startSwiping}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600"
                >
                  Find More Mentors
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render current view
  switch (currentView) {
    case "profile":
      return <ProfileScreen />;
    case "swiping":
      return <SwipingScreen />;
    case "matches":
      return <MatchesScreen />;
    default:
      return <HomeScreen />;
  }
}

export default App;
