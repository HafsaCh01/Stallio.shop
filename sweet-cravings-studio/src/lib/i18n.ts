import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enAbout from "./locales/en/about.json";
import enFeatures from "./locales/en/features.json";
import enHowItWorks from "./locales/en/howItWorks.json";
import enPricing from "./locales/en/pricing.json";
import enContact from "./locales/en/contact.json";
import enSolutions from "./locales/en/solutions.json";

import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esAbout from "./locales/es/about.json";
import esFeatures from "./locales/es/features.json";
import esHowItWorks from "./locales/es/howItWorks.json";
import esPricing from "./locales/es/pricing.json";
import esContact from "./locales/es/contact.json";
import esSolutions from "./locales/es/solutions.json";

export const defaultNS = "common";

export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    features: enFeatures,
    howItWorks: enHowItWorks,
    pricing: enPricing,
    contact: enContact,
    solutions: enSolutions,
  },
  es: {
    common: esCommon,
    home: esHome,
    about: esAbout,
    features: esFeatures,
    howItWorks: esHowItWorks,
    pricing: esPricing,
    contact: esContact,
    solutions: esSolutions,
  },
} as const;

export const STALLIO_LANG_KEY = "stallio-lang";

// Always initialize to English on both server and first client render so
// SSR output and the pre-hydration client render match exactly. The saved
// preference (if any) is applied client-side after mount in <LanguageSync />,
// which is a normal post-hydration update rather than a mismatch.
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    defaultNS,
    ns: Object.keys(resources.en),
    interpolation: { escapeValue: false },
  });
}

export default i18n;
