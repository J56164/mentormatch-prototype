import { Heart, User, MessageCircle, ArrowLeft } from "lucide-react";

export function MatchesScreen({ matches, setCurrentView }) {
  return (
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
                onClick={() => setCurrentView("swiping")}
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
                  onClick={() => setCurrentView("swiping")}
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
}
