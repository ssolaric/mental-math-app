import { Globe } from "lucide-react";
import { useTranslation } from "../i18n/TranslationContext";

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  const toggleLanguage = () => {
    setLocale(locale === "es" ? "en" : "es");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-4 right-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-md transition-colors flex items-center gap-2 z-50"
      aria-label={locale === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
    >
      <Globe size={20} />
      <span className="text-sm font-bold">{locale === "es" ? "EN" : "ES"}</span>
    </button>
  );
}
