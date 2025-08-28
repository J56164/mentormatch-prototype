import { useRef, useState } from "react";
import { useMockMentors } from "../hooks/useMockMentors";
import { Heart, X, User, Briefcase, ArrowLeft } from "lucide-react";

export function SwipingScreen({ matches, setMatches, setCurrentView }) {
  // Sample mentor data
  const mentors = useMockMentors();
  const [currentMentorIndex, setCurrentMentorIndex] = useState(0);
  const currentMentor = mentors[currentMentorIndex];

  // Touch/swipe state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

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
              {currentMentor.image != null ? (
                <img
                  src={currentMentor.image}
                  className="h-80 w-full object-cover"
                />
              ) : (
                <User size={80} className="text-gray-400" />
              )}
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
}
