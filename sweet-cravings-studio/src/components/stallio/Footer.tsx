import type { ReactElement } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Home,
  CreditCard,
  Info,
  ListChecks,
  Zap,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";
import { Logo } from "./Logo";
import {
  footerLinks,
  footerNavLinks,
  siteConfig,
  socialLinks,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const navIcons: Record<string, typeof Home> = {
  home: Home,
  pricing: CreditCard,
  about: Info,
  howItWorks: ListChecks,
  features: Zap,
  contact: Mail,
};

function XLogo({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2H21.5l-7.5 8.573L22.75 22h-6.938l-5.43-7.09L4.13 22H.87l8.03-9.176L1.5 2h7.125l4.908 6.49L18.244 2Zm-1.214 18.17h1.833L7.05 3.72H5.08l11.95 16.45Z" />
    </svg>
  );
}

const socialIcons: Record<string, (props: { size?: number }) => ReactElement> =
  {
    Instagram: (props) => <Instagram {...props} strokeWidth={2} />,
    Facebook: (props) => <Facebook {...props} strokeWidth={2} />,
    LinkedIn: (props) => <Linkedin {...props} strokeWidth={2} />,
    X: (props) => <XLogo {...props} />,
  };

export function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative mt-auto overflow-hidden border-t border-white/10 bg-navy"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[140px]"
        style={{ animation: "drift-c 27s ease-in-out infinite" }}
      />
      <Container className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.1fr_1fr_0.85fr_0.7fr] lg:gap-8">
        {/* Brand */}
        <div className="max-w-xs">
          <Link to="/" aria-label={t("nav.logInLabel")}>
            <Logo wordmarkClassName="text-white" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-[#bab4dd]">
            {t("site.tagline")} {t("footer.taglineExtra")}
          </p>
          <CTAButton href="/signup" size="sm" className="mt-6">
            {t("footer.getStartedFree")}
          </CTAButton>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            {t("footer.linksHeading")}
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
            {footerNavLinks.map((link) => {
              const Icon = navIcons[link.id];
              const label = t(`nav.${link.id}`);
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="group flex min-w-0 items-center gap-2 text-sm text-[#bab4dd] transition-colors hover:text-white"
                  >
                    {Icon && (
                      <Icon
                        size={14}
                        strokeWidth={2}
                        className="shrink-0 text-[#8b7fb8] transition-colors group-hover:text-lime"
                      />
                    )}
                    <span className="min-w-0 leading-snug">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            {t("footer.contactHeading")}
          </h3>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-[#1f1440] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-lime/40"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#170f2f] text-lime">
              <Mail size={15} strokeWidth={2} />
            </span>
            <span className="min-w-0 break-all">{siteConfig.contactEmail}</span>
          </a>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            {t("footer.socialHeading")}
          </h3>
          <ul className="mt-4 flex items-center gap-2.5">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#1f1440] text-[#bab4dd] transition-colors hover:border-lime/40 hover:text-white",
                    )}
                  >
                    {Icon && <Icon size={16} />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col-reverse items-center gap-4 py-6 text-xs text-[#8b7fb8] sm:flex-row sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. {t("footer.rightsReserved")}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footerLinks.legal.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {t(`footer.legal.${link.id}`)}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
