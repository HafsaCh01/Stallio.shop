import {
  Zap,
  ShieldCheck,
  Smartphone,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../Container";
import { RouteDivider } from "../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Reason = {
  icon: LucideIcon;
  stat: string;
  title: string;
  description: string;
  accent: "violet" | "teal" | "pink" | "lime";
};

const accentClasses: Record<
  Reason["accent"],
  { icon: string; glow: string }
> = {
  violet: { icon: "bg-violet/15 text-violet", glow: "bg-violet/30" },
  teal: { icon: "bg-teal/15 text-teal", glow: "bg-teal/30" },
  pink: { icon: "bg-pink/15 text-pink", glow: "bg-pink/30" },
  lime: { icon: "bg-lime/15 text-lime", glow: "bg-lime/30" },
};

const reasons: Reason[] = [
  {
    icon: Zap,
    stat: "3 min",
    title: "Live before the day ends",
    description:
      "No domain, no gateway paperwork, no developer. Sign up, add a few products, share the link.",
    accent: "violet",
  },
  {
    icon: Smartphone,
    stat: "100%",
    title: "Built mobile-first",
    description:
      "Your buyers shop on a phone in a chat app. Every page is designed for a thumb, not a desktop.",
    accent: "teal",
  },
  {
    icon: ShieldCheck,
    stat: "0",
    title: "Trust, without the guesswork",
    description:
      "Real product pages, clear prices, and order confirmations make a small shop look established.",
    accent: "pink",
  },
  {
    icon: Repeat,
    stat: "1 link",
    title: "Works everywhere you post",
    description:
      "Bio, status, story, group chat — the same link carries your whole catalog and checkout.",
    accent: "lime",
  },
];

const quotes = [
  {
    name: "Ayesha",
    role: "Thrift reseller, Lahore",
    quote:
      "I stopped answering “how much?” fifty times a day. People just open the link and order.",
  },
  {
    name: "Bilal",
    role: "Home baker, Karachi",
    quote:
      "Orders finally live in one dashboard instead of six chats and a notebook.",
  },
];

export function WhyItLands() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="why-it-lands" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]"
      />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            Why it lands
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Why sellers stick with Stallio
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            It isn&apos;t another dashboard to learn. It removes the four things
            that quietly cost you orders every week.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5"
        >
          {reasons.map((reason, i) => {
            const accent = accentClasses[reason.accent];
            const featured = i === 0;
            return (
              <article
                key={reason.title}
                data-visible={visible}
                className={cn(
                  "reveal group relative flex overflow-hidden rounded-3xl border border-ink/10 bg-surface/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/40 hover:bg-surface",
                  featured
                    ? "flex-col justify-end p-6 sm:p-8 lg:col-span-2 lg:row-span-2"
                    : i === 1
                      ? "flex-col justify-center p-5 sm:p-7 lg:col-span-2"
                      : "flex-col justify-center p-5 sm:p-7",
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-40",
                    accent.glow,
                  )}
                />

                <div
                  className={cn(
                    "relative flex items-center gap-4",
                    featured ? "flex-col items-start gap-6" : "",
                  )}
                >
                  <span
                    className={cn(
                      "flex shrink-0 items-center justify-center rounded-2xl",
                      accent.icon,
                      featured ? "h-14 w-14" : "h-11 w-11",
                    )}
                  >
                    <reason.icon
                      size={featured ? 26 : 20}
                      strokeWidth={2}
                    />
                  </span>
                  <span
                    className={cn(
                      "min-w-0 truncate bg-[image:var(--gradient-warm)] bg-clip-text font-display font-semibold text-transparent",
                      featured ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl",
                    )}
                  >
                    {reason.stat}
                  </span>
                </div>

                <h3
                  className={cn(
                    "relative font-display font-semibold text-ink",
                    featured
                      ? "mt-6 text-xl sm:text-2xl"
                      : "mt-5 text-base sm:text-lg",
                  )}
                >
                  {reason.title}
                </h3>
                <p
                  className={cn(
                    "relative mt-2 leading-relaxed text-ink-soft",
                    featured ? "max-w-xs text-sm sm:text-base" : "text-sm",
                  )}
                >
                  {reason.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:gap-6">
          {quotes.map((q, i) => (
            <blockquote
              key={q.name}
              data-visible={visible}
              className="reveal rounded-3xl border border-ink/10 bg-paper-dim p-5 sm:p-7"
              style={{ transitionDelay: `${400 + i * 120}ms` }}
            >
              <p className="font-display text-base leading-relaxed text-ink sm:text-lg">
                “{q.quote}”
              </p>
              <footer className="mt-4 flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-sm font-semibold text-ink">
                  {q.name.charAt(0)}
                </span>
                <span className="min-w-0 truncate text-sm text-ink-soft">
                  <span className="font-semibold text-ink">{q.name}</span> ·{" "}
                  {q.role}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
