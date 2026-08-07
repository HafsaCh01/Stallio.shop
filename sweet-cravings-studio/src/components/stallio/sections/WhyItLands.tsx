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

type Reason = {
  icon: LucideIcon;
  stat: string;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    icon: Zap,
    stat: "3 min",
    title: "Live before the day ends",
    description:
      "No domain, no gateway paperwork, no developer. Sign up, add a few products, share the link.",
  },
  {
    icon: Smartphone,
    stat: "100%",
    title: "Built mobile-first",
    description:
      "Your buyers shop on a phone in a chat app. Every page is designed for a thumb, not a desktop.",
  },
  {
    icon: ShieldCheck,
    stat: "0",
    title: "Trust, without the guesswork",
    description:
      "Real product pages, clear prices, and order confirmations make a small shop look established.",
  },
  {
    icon: Repeat,
    stat: "1 link",
    title: "Works everywhere you post",
    description:
      "Bio, status, story, group chat — the same link carries your whole catalog and checkout.",
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
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-6"
        >
          {reasons.map((reason, i) => (
            <article
              key={reason.title}
              data-visible={visible}
              className="reveal group relative overflow-hidden rounded-3xl border border-ink/10 bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/40 hover:bg-surface sm:p-7"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[image:var(--gradient-brand)] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-40" />
              <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet/15 text-teal">
                  <reason.icon size={20} strokeWidth={2} />
                </span>
                <span className="min-w-0 truncate bg-[image:var(--gradient-warm)] bg-clip-text font-display text-2xl font-semibold text-transparent sm:text-3xl">
                  {reason.stat}
                </span>
              </div>
              <h3 className="relative mt-5 font-display text-base font-semibold text-ink sm:text-lg">
                {reason.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-ink-soft">
                {reason.description}
              </p>
            </article>
          ))}
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
