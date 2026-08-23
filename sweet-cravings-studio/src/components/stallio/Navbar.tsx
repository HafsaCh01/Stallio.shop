import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Home,
  Info,
  ListChecks,
  Zap,
  CreditCard,
  Mail,
  Menu,
  X,
  Moon,
  Sun,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";
import { Logo } from "./Logo";
import { Marquee } from "./Marquee";
import { LanguageSwitcher, LanguageSwitcherMobile } from "./LanguageSwitcher";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";

function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  const { t } = useTranslation("common");
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={
        theme === "dark" ? t("nav.switchToLight") : t("nav.switchToDark")
      }
      className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-paper-dim text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/50 hover:text-ink"
    >
      <Sun
        size={16}
        strokeWidth={2.25}
        className={cn(
          "absolute transition-all duration-300",
          theme === "dark"
            ? "scale-0 -rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100",
        )}
      />
      <Moon
        size={15}
        strokeWidth={2.25}
        className={cn(
          "absolute transition-all duration-300",
          theme === "dark"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0",
        )}
      />
    </button>
  );
}

const navIcons: Record<string, typeof Home> = {
  home: Home,
  about: Info,
  howItWorks: ListChecks,
  features: Zap,
  pricing: CreditCard,
  contact: Mail,
};

type Highlight = { left: number; width: number; opacity: number };

export function Navbar() {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggleTheme } = useTheme();

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLElement | null>>({});
  const [highlight, setHighlight] = useState<Highlight>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const isActive = (href: string) => !href.includes("#") && href === pathname;
  const activeLink = navLinks.find((l) => isActive(l.href));

  const moveHighlightTo = (id: string | undefined) => {
    const nav = navRef.current;
    const el = id ? linkRefs.current[id] : null;
    if (!nav || !el) {
      setHighlight((h) => ({ ...h, opacity: 0 }));
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setHighlight({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    moveHighlightTo(activeLink?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, mounted]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-paper/85 backdrop-blur-md transition-all duration-500",
        scrolled && "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]",
        mounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
      )}
    >
      <Marquee />

      <Container className="grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-ink/10 sm:h-20 md:flex md:items-center md:justify-between xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-3">
        <div className="contents xl:col-start-2 xl:flex xl:items-center xl:gap-4">
          <Link
            to="/"
            aria-label={t("nav.logInLabel")}
            className="group shrink-0 justify-self-start transition-transform duration-300 hover:scale-[1.03]"
          >
            <Logo />
          </Link>

          <nav
            ref={navRef}
            aria-label={t("nav.primaryLabel")}
            onMouseLeave={() => moveHighlightTo(activeLink?.id)}
            className="relative hidden shrink-0 items-center gap-1 rounded-full border border-ink/10 bg-surface/60 p-1 xl:flex"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-1 rounded-full bg-paper shadow-[0_2px_10px_-2px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out"
              style={{
                left: highlight.left,
                width: highlight.width,
                opacity: highlight.opacity,
              }}
            />

            {navLinks.map((link) => {
              const Icon = navIcons[link.id];
              const label = t(`nav.${link.id}`);
              const active = isActive(link.href);
              const className = cn(
                "relative z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium tracking-tight transition-colors duration-200",
                active ? "text-ink" : "text-ink-soft hover:text-ink",
              );
              const isHash = link.href.includes("#");
              const setRef = (el: HTMLElement | null) => {
                linkRefs.current[link.id] = el;
              };

              return isHash ? (
                <a
                  key={link.id}
                  ref={setRef}
                  href={link.href}
                  onMouseEnter={() => moveHighlightTo(link.id)}
                  className={className}
                >
                  {Icon && (
                    <Icon size={14} strokeWidth={2.25} aria-hidden="true" />
                  )}
                  {label}
                </a>
              ) : (
                <Link
                  key={link.id}
                  ref={setRef}
                  to={link.href}
                  onMouseEnter={() => moveHighlightTo(link.id)}
                  className={className}
                >
                  {Icon && (
                    <Icon size={14} strokeWidth={2.25} aria-hidden="true" />
                  )}
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden shrink-0 items-center gap-2 justify-self-end xl:col-start-3 xl:flex">
          <LanguageSwitcher />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <Link
            to="/login"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium tracking-tight text-ink-soft transition-colors duration-200 hover:text-ink"
          >
            <LogIn size={14} strokeWidth={2.25} aria-hidden="true" />
            {t("nav.logIn")}
          </Link>
          <CTAButton href="/signup" size="sm" className="shrink-0">
            <UserPlus size={14} strokeWidth={2.25} aria-hidden="true" />
            {t("nav.startFree")}
          </CTAButton>
        </div>

        {/* Hamburger covers everything below `xl`. Translated nav labels
            (e.g. "Cómo Funciona", "Iniciar Sesión") are noticeably longer
            than their English counterparts, so the full pill-nav + actions
            row now only appears once there's enough room at `xl` and up —
            below that it collapses to the hamburger instead of squeezing
            and overlapping the logo. */}
        <div className="flex items-center gap-1.5 xl:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/10"
          >
            <Menu
              size={22}
              className={cn(
                "absolute transition-all duration-300",
                open
                  ? "scale-0 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100",
              )}
            />
            <X
              size={22}
              className={cn(
                "absolute transition-all duration-300",
                open
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 -rotate-90 opacity-0",
              )}
            />
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-b border-ink/10 bg-paper transition-[max-height] duration-300 ease-in-out md:hidden",
          open ? "max-h-[36rem]" : "max-h-0",
        )}
      >
        <Container className="flex flex-col gap-1 pb-6 pt-2">
          {navLinks.map((link, i) => {
            const Icon = navIcons[link.id];
            const label = t(`nav.${link.id}`);
            const active = isActive(link.href);
            const className = cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-base font-medium transition-all duration-300",
              active
                ? "bg-ink/5 text-ink"
                : "text-ink/90 hover:bg-ink/5 hover:text-ink",
              open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
            );
            const style = { transitionDelay: open ? `${i * 40}ms` : "0ms" };
            const isHash = link.href.includes("#");

            return isHash ? (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className={className}
                style={style}
              >
                {Icon && (
                  <Icon size={17} strokeWidth={2.25} aria-hidden="true" />
                )}
                {label}
              </a>
            ) : (
              <Link
                key={link.id}
                to={link.href}
                onClick={() => setOpen(false)}
                className={className}
                style={style}
              >
                {Icon && (
                  <Icon size={17} strokeWidth={2.25} aria-hidden="true" />
                )}
                {label}
              </Link>
            );
          })}
          <LanguageSwitcherMobile className="mt-3" />
          <div className="mt-3 flex flex-col gap-2">
            <CTAButton
              href="/login"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              <LogIn size={14} strokeWidth={2.25} aria-hidden="true" />
              {t("nav.logIn")}
            </CTAButton>
            <CTAButton
              href="/signup"
              size="sm"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              <UserPlus size={14} strokeWidth={2.25} aria-hidden="true" />
              {t("nav.startFree")}
            </CTAButton>
          </div>
        </Container>
      </div>
    </header>
  );
}
