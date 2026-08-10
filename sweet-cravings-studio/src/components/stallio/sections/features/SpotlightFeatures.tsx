import {
  Link2,
  RefreshCw,
  Wallet,
  ShieldCheck,
  BarChart3,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Spotlight = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: { icon: LucideIcon; text: string }[];
  accent: "violet" | "teal" | "pink";
  visual: "link" | "checkout" | "dashboard";
};

const spotlights: Spotlight[] = [
  {
    eyebrow: "01 — Storefront",
    title: "One link, always up to date",
    description:
      "Edit a price, swap a photo, or add a new drop, and your storefront updates instantly. The same link keeps working everywhere you've already shared it.",
    bullets: [
      { icon: Link2, text: "No re-sharing a new link after every change" },
      { icon: RefreshCw, text: "Changes go live the moment you save" },
    ],
    accent: "violet",
    visual: "link",
  },
  {
    eyebrow: "02 — Checkout",
    title: "Checkout without the paperwork",
    description:
      "UPI and cash-on-delivery are ready on day one. There's no payment gateway application, no approval wait, and nothing extra to wire up before you can take an order.",
    bullets: [
      { icon: Wallet, text: "Two payment methods, zero setup" },
      { icon: ShieldCheck, text: "No merchant account or gateway approval" },
    ],
    accent: "teal",
    visual: "checkout",
  },
  {
    eyebrow: "03 — Operations",
    title: "A dashboard instead of a notebook",
    description:
      "Every order lands in one dashboard with the buyer's details attached, so you're not cross-checking a paper ledger against a dozen chat threads.",
    bullets: [
      { icon: BarChart3, text: "One view for every order and its status" },
      { icon: Users, text: "Buyer contact saved with each order" },
    ],
    accent: "pink",
    visual: "dashboard",
  },
];

const accentClasses = {
  violet: { text: "text-violet", bg: "bg-violet/15", ring: "ring-violet/30", glow: "bg-violet/30", grad: "from-violet/25" },
  teal: { text: "text-teal", bg: "bg-teal/15", ring: "ring-teal/30", glow: "bg-teal/25", grad: "from-teal/25" },
  pink: { text: "text-pink", bg: "bg-pink/15", ring: "ring-pink/30", glow: "bg-pink/25", grad: "from-pink/25" },
} as const;

export function SpotlightFeatures() {
  return (
    <section id="spotlight" className="relative overflow-hidden bg-paper-dim">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            Why sellers switch
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            A closer look at three features that matter most
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-16 lg:mt-16 lg:gap-24">
          {spotlights.map((spotlight, i) => (
            <SpotlightRow key={spotlight.title} spotlight={spotlight} reversed={i % 2 === 1} />
          ))}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function SpotlightRow({ spotlight, reversed }: { spotlight: Spotlight; reversed: boolean }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const accent = accentClasses[spotlight.accent];

  return (
    <div
      ref={ref}
      className={cn(
        "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
        reversed && "lg:[&>*:first-child]:order-2",
      )}
    >
      <div data-visible={visible} className={reversed ? "reveal-right" : "reveal-left"}>
        <span className={cn("text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-xs", accent.text)}>
          {spotlight.eyebrow}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-ink sm:text-2xl lg:text-3xl">
          {spotlight.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
          {spotlight.description}
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {spotlight.bullets.map((bullet) => (
            <li key={bullet.text} className="flex items-center gap-3">
              <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", accent.bg, accent.text)}>
                <bullet.icon size={16} strokeWidth={2} />
              </span>
              <span className="text-sm text-ink sm:text-base">{bullet.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div data-visible={visible} className={reversed ? "reveal-left" : "reveal-right"}>
        <SpotlightVisual visual={spotlight.visual} accent={spotlight.accent} />
      </div>
    </div>
  );
}

function SpotlightVisual({
  visual,
  accent,
}: {
  visual: Spotlight["visual"];
  accent: Spotlight["accent"];
}) {
  const a = accentClasses[accent];

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className={cn("pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br to-transparent blur-2xl", a.grad)} />
      <div className={cn("relative overflow-hidden rounded-[1.75rem] border bg-surface p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)] ring-1", a.ring, "border-ink/10")}>
        {visual === "link" && (
          <div className="flex flex-col gap-3">
            <div className={cn("flex items-center gap-2 rounded-full px-4 py-2.5", a.bg)}>
              <Link2 size={14} className={a.text} strokeWidth={2.5} />
              <span className="truncate text-xs font-semibold text-ink">stallio.shop/your-store</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-ink/8 bg-paper-dim px-4 py-3">
              <span className="text-xs text-ink-soft">Instagram bio</span>
              <span className="text-[10px] font-semibold text-teal">Synced</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-ink/8 bg-paper-dim px-4 py-3">
              <span className="text-xs text-ink-soft">WhatsApp status</span>
              <span className="text-[10px] font-semibold text-teal">Synced</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-ink/8 bg-paper-dim px-4 py-3">
              <span className="text-xs text-ink-soft">Group chats</span>
              <span className="text-[10px] font-semibold text-teal">Synced</span>
            </div>
          </div>
        )}

        {visual === "checkout" && (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Choose payment</p>
            <div className={cn("flex items-center justify-between rounded-xl px-4 py-3", a.bg)}>
              <span className="text-sm font-semibold text-ink">UPI</span>
              <span className={cn("h-4 w-4 rounded-full ring-2", a.ring)} />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-ink/10 bg-paper-dim px-4 py-3">
              <span className="text-sm font-medium text-ink-soft">Cash on delivery</span>
              <span className="h-4 w-4 rounded-full border border-ink/20" />
            </div>
            <div className="mt-1 rounded-xl bg-ink px-4 py-3 text-center text-xs font-semibold text-white">
              No gateway sign-up required
            </div>
          </div>
        )}

        {visual === "dashboard" && (
          <div className="flex flex-col gap-2.5">
            {["#1042 · Ayesha K.", "#1041 · Bilal R.", "#1039 · Sana M."].map((label, i) => (
              <div key={label} className="flex items-center justify-between rounded-xl border border-ink/8 bg-paper-dim px-4 py-2.5">
                <span className="text-xs font-medium text-ink">{label}</span>
                <span className={cn("h-2 w-2 rounded-full", i === 0 ? "bg-amber" : "bg-teal")} />
              </div>
            ))}
            <div className={cn("mt-1 flex items-center justify-between rounded-xl px-4 py-2.5", a.bg)}>
              <span className="text-xs font-semibold text-ink">Total this week</span>
              <span className={cn("text-sm font-bold", a.text)}>18 orders</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
