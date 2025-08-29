import { useState } from "react";
import { HomeScreen } from "./pages/HomeScreen";
import { ProfileScreen } from "./pages/ProfileScreen";
import { SwipingScreen } from "./pages/SwipingScreen";
import { MatchesScreen } from "./pages/MatchesScreen";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

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
      return (
        <>
          <HomeScreen setCurrentView={setCurrentView} />
          <button
            className="absolute right-2 top-1 font-bold cursor-pointer"
            onClick={() =>
              i18n.changeLanguage(i18n.language == "th" ? "en" : "th")
            }
          >
            {t("common.language-code")}
          </button>
        </>
      );
  }
}

export default App;
