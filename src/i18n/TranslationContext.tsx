import type { ReactNode } from "react";
import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Preferences } from "../types";
import { STORAGE_KEYS } from "../types";
import { translations } from "./index";
import type { Locale } from "./types";

interface TranslationContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const TranslationContext = createContext<TranslationContextValue | undefined>(
  undefined,
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  // Default to Spanish - store in localStorage preferences
  const [preferences, setPreferences] = useLocalStorage<Preferences>(
    STORAGE_KEYS.PREFERENCES,
    { language: "es" },
  );

  const setLocale = (newLocale: Locale) => {
    setPreferences({ ...preferences, language: newLocale });
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split(".");
    let value: unknown = translations[preferences.language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Fallback to key itself
      }
    }

    if (typeof value !== "string") {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    // Handle parameter substitution
    if (params) {
      return Object.entries(params).reduce(
        (str, [param, val]) => str.replace(`{{${param}}}`, String(val)),
        value,
      );
    }

    return value;
  };

  // Update document language attribute for accessibility
  useEffect(() => {
    document.documentElement.lang = preferences.language === "es" ? "es" : "en";
  }, [preferences.language]);

  return (
    <TranslationContext.Provider
      value={{ locale: preferences.language, setLocale, t }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
}
