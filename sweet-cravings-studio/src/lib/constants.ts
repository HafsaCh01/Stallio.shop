export const siteConfig = {
  name: "Stallio",
  shortName: "Stallio",
  contactEmail: "contact@stallio.shop",
};

/** Stable, non-translated ids used for icon lookup and i18n keys. Display
 * labels are resolved at render time via t(`common:nav.${id}`) etc. */
export const navLinks = [
  { id: "home", href: "/" },
  { id: "about", href: "/about" },
  { id: "howItWorks", href: "/how-it-works" },
  { id: "features", href: "/features" },
  { id: "pricing", href: "/pricing" },
  { id: "contact", href: "/contact" },
];

export const footerLinks = {
  product: [
    { id: "howItWorks", href: "/how-it-works" },
    { id: "features", href: "/features" },
    { id: "pricing", href: "/pricing" },
    { id: "aboutUs", href: "/about" },
  ],
  support: [
    { id: "gettingStarted", href: "/#final-cta" },
    { id: "contactUs", href: "/contact" },
    { id: "faqs", href: "/pricing#faq" },
  ],
  legal: [
    { id: "privacyPolicy", href: "/privacy" },
    { id: "termsOfService", href: "/terms" },
    { id: "refundPolicy", href: "/refund-policy" },
  ],
};

/** Ordered left-to-right, top-to-bottom for the footer's 2-column icon grid. */
export const footerNavLinks = [
  { id: "home", href: "/" },
  { id: "pricing", href: "/pricing" },
  { id: "about", href: "/about" },
  { id: "howItWorks", href: "/how-it-works" },
  { id: "features", href: "/features" },
  { id: "contact", href: "/contact" },
];

/** Brand names are not translated. */
export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/stallio.shop" },
  { label: "Facebook", href: "https://facebook.com/stallio.shop" },
  { label: "LinkedIn", href: "https://linkedin.com/company/stallio" },
  { label: "X", href: "https://x.com/stallioshop" },
];

export const sellerCategoryIds = [
  "clothingBoutiques",
  "homeBakers",
  "skincareBrands",
  "jewelryMakers",
  "thriftResellers",
  "handmadeCrafts",
];
