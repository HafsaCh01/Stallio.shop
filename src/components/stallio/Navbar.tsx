import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Info,
  ListChecks,
  Zap,
  CreditCard,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";
import { Logo } from "./Logo";
import { Marquee } from "./Marquee";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navIcons: Record<string, typeof Home> = {
  Home: Home,
  About: Info,
  "How It Works": ListChecks,
  Features: Zap,
  Pricing: CreditCard,
  Contact: Mail,
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => !href.includes("#") && href === pathname;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-paper/85 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]",
      )}
    >
      <Marquee />

      <Container className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-ink/10 sm:h-20 md:flex md:justify-between">
        <Link to="/" aria-label="Stallio home" className="min-w-0">
          <Logo />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 md:flex lg:gap-7"
        >
          {navLinks.map((link) => {
            const Icon = navIcons[link.label];
            const active = isActive(link.href);
            const className = cn(
              "relative flex items-center gap-1.5 text-sm font-medium tracking-tight transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-teal after:transition-transform after:duration-200 hover:after:scale-x-100",
              active
                ? "text-ink after:scale-x-100"
                : "text-ink-soft hover:text-ink",
            );
            const isHash = link.href.includes("#");

            return isHash ? (
              <a key={link.label} href={link.href} className={className}>
                {Icon && (
                  <Icon size={14} strokeWidth={2.25} aria-hidden="true" />
                )}
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href} className={className}>
                {Icon && (
                  <Icon size={14} strokeWidth={2.25} aria-hidden="true" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <CTAButton href="/#final-cta" size="sm">
            Create your store
          </CTAButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/10 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-b border-ink/10 bg-paper transition-[max-height] duration-300 ease-in-out md:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <Container className="flex flex-col gap-1 pb-6 pt-2">
          {navLinks.map((link) => {
            const Icon = navIcons[link.label];
            const active = isActive(link.href);
            const className = cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
              active
                ? "bg-ink/5 text-ink"
                : "text-ink/90 hover:bg-ink/5 hover:text-ink",
            );
            const isHash = link.href.includes("#");

            return isHash ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={className}
              >
                {Icon && (
                  <Icon size={17} strokeWidth={2.25} aria-hidden="true" />
                )}
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className={className}
              >
                {Icon && (
                  <Icon size={17} strokeWidth={2.25} aria-hidden="true" />
                )}
                {link.label}
              </Link>
            );
          })}
          <CTAButton
            href="/#final-cta"
            size="sm"
            className="mt-3 w-full"
            onClick={() => setOpen(false)}
          >
            Create your store
          </CTAButton>
        </Container>
      </div>
    </header>
  );
}
