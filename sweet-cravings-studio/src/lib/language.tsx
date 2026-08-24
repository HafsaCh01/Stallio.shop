import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import i18n, {
  LANGUAGE_STORAGE_KEY,
  isRtlLanguage,
  type SupportedLanguage,
} from "@/i18n/config";

type LanguageContextValue = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "en" || stored === "es" || stored === "ar") return stored;
  const browserLang = window.navigator.language.slice(0, 2);
  if (browserLang === "es") return "es";
  if (browserLang === "ar") return "ar";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(
    getInitialLanguage,
  );

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute(
      "dir",
      isRtlLanguage(language) ? "rtl" : "ltr",
    );
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
  }, [language]);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
  }, []);

  /** Cycles EN -> ES -> AR -> EN. Kept for any legacy two-state toggle UI. */
  const toggleLanguage = useCallback(() => {
    setLanguageState((current) =>
      current === "en" ? "es" : current === "es" ? "ar" : "en",
    );
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
