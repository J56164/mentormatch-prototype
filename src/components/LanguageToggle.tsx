import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { t, i18n } = useTranslation();

  return (
    <button
      className="absolute right-2 top-1 font-bold cursor-pointer"
      onClick={() => i18n.changeLanguage(i18n.language == "th" ? "en" : "th")}
    >
      {t("common.language-code")}
    </button>
  );
}
