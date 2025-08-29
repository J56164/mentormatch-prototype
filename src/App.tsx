import { useState } from "react";
import { HomeScreen } from "./pages/HomeScreen";
import { ProfileScreen } from "./pages/ProfileScreen";
import { SwipingScreen } from "./pages/SwipingScreen";
import { MatchesScreen } from "./pages/MatchesScreen";
import { LanguageToggle } from "./components/LanguageToggle";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [matches, setMatches] = useState([]);

  return (
    <>
      <LanguageToggle />
      {currentView == "profile" ? (
        <ProfileScreen setCurrentView={setCurrentView} />
      ) : currentView == "swiping" ? (
        <SwipingScreen
          matches={matches}
          setMatches={setMatches}
          setCurrentView={setCurrentView}
        />
      ) : currentView == "matches" ? (
        <MatchesScreen matches={matches} setCurrentView={setCurrentView} />
      ) : (
        <HomeScreen setCurrentView={setCurrentView} />
      )}
    </>
  );
}

export default App;
