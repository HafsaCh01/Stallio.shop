import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enAbout from "./locales/en/about.json";
import enFeatures from "./locales/en/features.json";
import enHowItWorks from "./locales/en/howItWorks.json";
import enPricing from "./locales/en/pricing.json";
import enAuth from "./locales/en/auth.json";
import enContact from "./locales/en/contact.json";
import enLegal from "./locales/en/legal.json";

import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esAbout from "./locales/es/about.json";
import esFeatures from "./locales/es/features.json";
import esHowItWorks from "./locales/es/howItWorks.json";
import esPricing from "./locales/es/pricing.json";
import esAuth from "./locales/es/auth.json";
import esContact from "./locales/es/contact.json";
import esLegal from "./locales/es/legal.json";

export const SUPPORTED_LANGUAGES = ["en", "es"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_STORAGE_KEY = "stallio-language";

export const languageMeta: Record<
  SupportedLanguage,
  { label: string; shortLabel: string }
> = {
  en: { label: "English", shortLabel: "EN" },
  es: { label: "Español", shortLabel: "ES" },
};

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    features: enFeatures,
    howItWorks: enHowItWorks,
    pricing: enPricing,
    auth: enAuth,
    contact: enContact,
    legal: enLegal,
  },
  es: {
    common: esCommon,
    home: esHome,
    about: esAbout,
    features: esFeatures,
    howItWorks: esHowItWorks,
    pricing: esPricing,
    auth: esAuth,
    contact: esContact,
    legal: esLegal,
  },
} as const;

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "en" || stored === "es") return stored;
  const browserLang = window.navigator.language.slice(0, 2);
  return browserLang === "es" ? "es" : "en";
}

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    defaultNS: "common",
    ns: [
      "common",
      "home",
      "about",
      "features",
      "howItWorks",
      "pricing",
      "auth",
      "contact",
      "legal",
    ],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

/** Inline script to set <html lang> before first paint, avoiding a language-attribute mismatch flash. */
export const languageInitScript = `
(function () {
  try {
    var stored = window.localStorage.getItem('${LANGUAGE_STORAGE_KEY}');
    var lang = stored === 'es' ? 'es' : (stored === 'en' ? 'en' : (navigator.language.slice(0,2) === 'es' ? 'es' : 'en'));
    document.documentElement.setAttribute('lang', lang);
  } catch (e) {}
})();
`;

export default i18next;
