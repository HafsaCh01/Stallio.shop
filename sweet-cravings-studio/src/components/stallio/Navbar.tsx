import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";
import { Logo } from "./Logo";
import { Marquee } from "./Marquee";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-paper/85 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]",
      )}
    >
      <Marquee />

      <Container className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-ink/10 sm:h-20 md:flex md:justify-between">
        <a href="#top" aria-label="Stallio home" className="min-w-0">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium tracking-tight text-ink-soft transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-teal after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <CTAButton href="#final-cta" size="sm">
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-ink/90 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <CTAButton
            href="#final-cta"
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
