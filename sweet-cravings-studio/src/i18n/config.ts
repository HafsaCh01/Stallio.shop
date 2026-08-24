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

import arCommon from "./locales/ar/common.json";
import arHome from "./locales/ar/home.json";
import arAbout from "./locales/ar/about.json";
import arFeatures from "./locales/ar/features.json";
import arHowItWorks from "./locales/ar/howItWorks.json";
import arPricing from "./locales/ar/pricing.json";
import arAuth from "./locales/ar/auth.json";
import arContact from "./locales/ar/contact.json";
import arLegal from "./locales/ar/legal.json";

export const SUPPORTED_LANGUAGES = ["en", "es", "ar"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/** Languages that read right-to-left. Used to drive the document `dir` attribute. */
export const RTL_LANGUAGES: readonly SupportedLanguage[] = ["ar"];

export function isRtlLanguage(lang: SupportedLanguage): boolean {
  return (RTL_LANGUAGES as readonly string[]).includes(lang);
}

export const LANGUAGE_STORAGE_KEY = "stallio-language";

export const languageMeta: Record<
  SupportedLanguage,
  { label: string; shortLabel: string }
> = {
  en: { label: "English", shortLabel: "EN" },
  es: { label: "Español", shortLabel: "ES" },
  ar: { label: "العربية", shortLabel: "AR" },
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
  ar: {
    common: arCommon,
    home: arHome,
    about: arAbout,
    features: arFeatures,
    howItWorks: arHowItWorks,
    pricing: arPricing,
    auth: arAuth,
    contact: arContact,
    legal: arLegal,
  },
} as const;

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "en" || stored === "es" || stored === "ar") return stored;
  const browserLang = window.navigator.language.slice(0, 2);
  if (browserLang === "es") return "es";
  if (browserLang === "ar") return "ar";
  return "en";
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
    var detected = navigator.language.slice(0,2) === 'es' ? 'es' : (navigator.language.slice(0,2) === 'ar' ? 'ar' : 'en');
    var lang = (stored === 'es' || stored === 'en' || stored === 'ar') ? stored : detected;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  } catch (e) {}
})();
`;

export default i18next;
