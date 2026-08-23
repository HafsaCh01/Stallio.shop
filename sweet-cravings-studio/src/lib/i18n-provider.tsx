import { useEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { STALLIO_LANG_KEY } from "./i18n";

export type Lang = "en" | "es";

function LanguageSync() {
  useEffect(() => {
    const saved = window.localStorage.getItem(STALLIO_LANG_KEY) as Lang | null;
    if (saved === "es" && i18n.language !== "es") {
      void i18n.changeLanguage("es");
    }
  }, []);

  useEffect(() => {
    const onChange = (lng: string) => {
      document.documentElement.lang = lng;
    };
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, []);

  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageSync />
      {children}
    </I18nextProvider>
  );
}

export function setLanguage(lang: Lang) {
  window.localStorage.setItem(STALLIO_LANG_KEY, lang);
  void i18n.changeLanguage(lang);
}

export function getStoredLanguage(): Lang {
  if (typeof window === "undefined") return "en";
  return (window.localStorage.getItem(STALLIO_LANG_KEY) as Lang | null) ?? "en";
}
