import { useTranslation } from "react-i18next";
import { Button } from "./ui/Button";
import { LanguagesIcon } from "lucide-react";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", language: "En" },
    { code: "cs", language: "Cs" },
  ];

  const handleLangClick = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="flex flex-row gap-5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`${i18n.language == lang.code ? "font-bold" : ""}`}
          onClick={() => handleLangClick(lang.code)}
        >
          {lang.language}
        </button>
      ))}
    </div>
  );
}

export function LanguageSwitch() {
  //button to switch between languages
  const { i18n } = useTranslation();

  //if cs => en, if en => cs
  const switchLang = () => {
    const lang = i18n.language === "en" ? "cs" : "en";
    i18n.changeLanguage(lang);
  };
  return (
    <Button variant="ghost" onClick={switchLang}>
      <LanguagesIcon size={8} />
    </Button>
  );
}
