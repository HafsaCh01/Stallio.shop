import {
  Infinity as InfinityIcon,
  Smartphone,
  Link2,
  ClipboardList,
  Wallet,
  Ban,
  Instagram,
  Gift,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../Container";
import { RouteDivider } from "../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

type Item = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "amber" | "pink" | "violet" | "teal";
};

const items: Item[] = [
  {
    icon: InfinityIcon,
    title: "Unlimited products",
    description: "No catalog cap, ever. List one item or one thousand.",
    accent: "violet",
  },
  {
    icon: Smartphone,
    title: "Mobile-optimized storefront",
    description: "Every page is built for the phone your customers are on.",
    accent: "teal",
  },
  {
    icon: Link2,
    title: "One shareable link",
    description: "No domain to buy or configure.",
    accent: "amber",
  },
  {
    icon: ClipboardList,
    title: "Order dashboard",
    description: "Every order and buyer detail in one place.",
    accent: "pink",
  },
  {
    icon: Wallet,
    title: "UPI & cash on delivery",
    description: "Both built in from day one, no setup needed.",
    accent: "violet",
  },
  {
    icon: Ban,
    title: "No payment gateway required",
    description: "Skip the paperwork and approval wait entirely.",
    accent: "teal",
  },
  {
    icon: Instagram,
    title: "Instagram & WhatsApp sharing",
    description: "Built to travel through the apps you already sell on.",
    accent: "amber",
  },
  {
    icon: Gift,
    title: "Free to start",
    description: "No card required to open your store.",
    accent: "pink",
  },
];

const accentClasses: Record<
  Item["accent"],
  { icon: string; glow: string; border: string }
> = {
  amber: {
    icon: "bg-amber/15 text-amber",
    glow: "bg-amber/40",
    border: "hover:border-amber/50",
  },
  pink: {
    icon: "bg-pink/15 text-pink",
    glow: "bg-pink/40",
    border: "hover:border-pink/50",
  },
  violet: {
    icon: "bg-violet/15 text-violet",
    glow: "bg-violet/40",
    border: "hover:border-violet/50",
  },
  teal: {
    icon: "bg-teal/15 text-teal",
    glow: "bg-teal/40",
    border: "hover:border-teal/50",
  },
};

export function WhatsIncluded() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const includedCount = useCountUp(items.length, visible, 900);

  return (
    <section id="whats-included" className="relative overflow-hidden bg-paper-dim">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-violet/15 blur-[150px]"
        style={{ animation: "drift-c 28s ease-in-out infinite" }}
      />
      <Container className="py-16 sm:py-20 lg:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:gap-8 sm:text-left">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
              What&apos;s included
            </span>
            <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Everything included.
              <br className="hidden sm:block" /> Nothing extra to buy.
            </h2>
          </div>
          <div
            data-visible={visible}
            className="reveal flex shrink-0 items-center gap-4 rounded-2xl border border-ink/10 bg-surface px-6 py-4 shadow-[0_24px_50px_-36px_rgba(0,0,0,0.9)]"
          >
            <span className="font-display text-4xl font-semibold tabular-nums text-lime">
              {includedCount}
            </span>
            <span className="max-w-[7rem] text-left text-xs leading-snug text-ink-soft">
              tools shipped in, zero add-on fees
            </span>
          </div>
        </div>

        <div
          ref={ref}
          className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5"
        >
          {items.map((item, i) => {
            const accent = accentClasses[item.accent];
            return (
              <div
                key={item.title}
                data-visible={visible}
                className="reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div
                  className={cn(
                    "group relative flex h-full min-h-[13rem] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-surface p-6 shadow-[0_24px_50px_-36px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1.5",
                    accent.border,
                  )}
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-50",
                      accent.glow,
                    )}
                  />

                  <div className="relative">
                    <span
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
                        accent.icon,
                      )}
                    >
                      <item.icon size={20} strokeWidth={2} />
                    </span>
                  </div>

                  <h3 className="relative mt-5 font-display text-base font-semibold leading-snug text-ink sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
