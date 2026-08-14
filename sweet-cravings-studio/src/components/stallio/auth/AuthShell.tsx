import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Navbar } from "@/components/stallio/Navbar";
import { Container } from "@/components/stallio/Container";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AuthShell({
  mode,
  promo,
  children,
}: {
  mode: "login" | "signup";
  promo: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-paper font-sans text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <span
          className="absolute -left-[12%] top-[-8%] h-[30rem] w-[30rem] rounded-full bg-violet/15 blur-[150px]"
          style={{ animation: "drift-a 24s ease-in-out infinite" }}
        />
        <span
          className="absolute -right-[10%] bottom-[-12%] h-[28rem] w-[28rem] rounded-full bg-pink/10 blur-[150px]"
          style={{ animation: "drift-b 28s ease-in-out infinite" }}
        />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-1 items-center py-10 sm:py-14 lg:py-16">
        <Container>
          {/*
            Login: promo stays left, form stays right (order-1 / order-2).
            Signup: swapped — form floats to the left, promo floats to the
            right. Both panels share a view-transition-name, so switching
            between the two pages morphs each one smoothly across the row
            instead of just cutting.
          */}
          <div
            className={cn(
              "grid items-center gap-10 lg:gap-12 xl:gap-16",
              mode === "signup"
                ? "lg:grid-cols-[1.15fr_0.85fr]"
                : "lg:grid-cols-[1.05fr_1fr]",
            )}
          >
            <div
              className={cn(
                "auth-promo-vt hidden lg:block",
                mode === "login" ? "lg:order-1" : "lg:order-2",
              )}
            >
              {promo}
            </div>
            <div
              className={cn(
                "mx-auto w-full lg:mx-0",
                mode === "signup" ? "max-w-2xl" : "max-w-md",
                mode === "login" ? "lg:order-2" : "lg:order-1",
              )}
            >
              {children}
            </div>
          </div>
        </Container>
      </main>

      <footer className="relative z-10 border-t border-ink/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-ink-faint sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}

/**
 * Card that wraps the actual form, styled as a phone screen — a nod to
 * Stallio being a mobile storefront: a dark bezel, a notch, and the form
 * itself sitting where the screen would be.
 */
export function AuthCard({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  size = "default",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode | undefined;
  /** "wide" gives denser forms (e.g. signup) more breathing room. */
  size?: "default" | "wide";
}) {
  return (
    <div
      className={cn(
        "auth-card-vt relative mx-auto w-full",
        size === "wide" ? "max-w-[620px]" : "max-w-[380px]",
      )}
    >
      {/* Signature element: a slowly rotating conic-gradient ring, sampled
          from the Stallio awning colours, glowing just behind the phone. */}
      <div
        aria-hidden="true"
        className="auth-glow-ring pointer-events-none absolute -inset-2 rounded-[3rem] opacity-[0.4] blur-[10px]"
      />

      {/* Phone bezel */}
      <div className="relative rounded-[2.75rem] border-[6px] border-navy bg-navy p-2 shadow-[0_30px_70px_-25px_rgba(26,31,60,0.5)]">
        {/* Side buttons for a bit of realism */}
        <span
          aria-hidden="true"
          className="absolute -left-[8px] top-20 h-8 w-[6px] rounded-l-full bg-navy"
        />
        <span
          aria-hidden="true"
          className="absolute -left-[8px] top-32 h-12 w-[6px] rounded-l-full bg-navy"
        />
        <span
          aria-hidden="true"
          className="absolute -right-[8px] top-28 h-14 w-[6px] rounded-r-full bg-navy"
        />

        {/* Screen */}
        <div
          className={cn(
            "relative overflow-hidden rounded-[2.1rem] bg-surface @container",
            size === "wide"
              ? "px-6 pb-5 pt-7 sm:px-9"
              : "px-6 pb-6 pt-9 sm:px-7",
          )}
        >
          {/* Notch */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-2.5 z-10 h-4 w-24 -translate-x-1/2 rounded-full bg-navy"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[image:var(--gradient-awning)] opacity-10 blur-3xl"
          />
          <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.16em] text-violet">
            {eyebrow}
          </span>
          <h1 className="relative mt-2 font-display text-xl font-semibold leading-tight tracking-tight text-ink sm:text-2xl">
            {title}
          </h1>
          <p className="relative mt-2 text-sm leading-relaxed text-ink-soft">
            {subtitle}
          </p>

          <div className="relative mt-6">{children}</div>

          {footer && (
            <div className="relative mt-6 border-t border-ink/10 pt-4 text-center text-sm text-ink-soft">
              {footer}
            </div>
          )}

          {/* Home indicator */}
          <div
            aria-hidden="true"
            className="relative mx-auto mt-6 h-1 w-28 rounded-full bg-ink/15"
          />
        </div>
      </div>
    </div>
  );
}
