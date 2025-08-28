import { User, Award, GraduationCap } from "lucide-react";

export function HomeScreen({ setCurrentView }) {
  return (
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
              setCurrentView("swiping");
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
}
