import { useState } from "react";
import { HomeScreen } from "./pages/HomeScreen";
import { ProfileScreen } from "./pages/ProfileScreen";
import { SwipingScreen } from "./pages/SwipingScreen";
import { MatchesScreen } from "./pages/MatchesScreen";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [matches, setMatches] = useState([]);

  // Render current view
  switch (currentView) {
    case "profile":
      return <ProfileScreen setCurrentView={setCurrentView} />;
    case "swiping":
      return (
        <SwipingScreen
          matches={matches}
          setMatches={setMatches}
          setCurrentView={setCurrentView}
        />
      );
    case "matches":
      return (
        <MatchesScreen matches={matches} setCurrentView={setCurrentView} />
      );
    default:
      return <HomeScreen setCurrentView={setCurrentView} />;
  }
}

export default App;
