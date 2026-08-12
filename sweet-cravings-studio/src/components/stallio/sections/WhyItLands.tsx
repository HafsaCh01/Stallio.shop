import {
  Zap,
  ShieldCheck,
  Smartphone,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../Container";
import { RouteDivider } from "../RouteDivider";
import { CTAButton } from "../CTAButton";
import { useReveal } from "@/hooks/use-reveal";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

type Reason = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "violet" | "teal" | "pink" | "lime";
};

const accentClasses: Record<
  Reason["accent"],
  { icon: string; ring: string; line: string; text: string }
> = {
  violet: {
    icon: "bg-violet/15 text-violet",
    ring: "ring-violet/40",
    line: "bg-violet",
    text: "text-violet",
  },
  teal: {
    icon: "bg-teal/15 text-teal",
    ring: "ring-teal/40",
    line: "bg-teal",
    text: "text-teal",
  },
  pink: {
    icon: "bg-pink/15 text-pink",
    ring: "ring-pink/40",
    line: "bg-pink",
    text: "text-pink",
  },
  lime: {
    icon: "bg-lime/15 text-lime",
    ring: "ring-lime/40",
    line: "bg-lime",
    text: "text-lime",
  },
};

const reasons: Reason[] = [
  {
    icon: Zap,
    title: "Live before the day ends",
    description:
      "No domain, no gateway paperwork, no developer. Sign up, add a few products, share the link — you're selling tonight.",
    accent: "violet",
  },
  {
    icon: Smartphone,
    title: "Built mobile-first",
    description:
      "Your buyers shop on a phone in a chat app. Every page is designed for a thumb, not a desktop.",
    accent: "teal",
  },
  {
    icon: ShieldCheck,
    title: "Trust, without the guesswork",
    description:
      "Real product pages, clear prices, and order confirmations make a small shop look established.",
    accent: "pink",
  },
  {
    icon: Repeat,
    title: "Works everywhere you post",
    description:
      "Bio, status, story, group chat: the same link carries your whole catalog and checkout.",
    accent: "lime",
  },
];

const stats = [
  { value: 3, suffix: " min", label: "to your first sale" },
  { value: 0, suffix: "", label: "apps to stitch together" },
  { value: 100, suffix: "%", label: "built for the phone" },
];

export function WhyItLands() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="why-it-lands" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-violet/25 blur-[140px]"
        style={{ animation: "drift-b 24s ease-in-out infinite" }}
      />
      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div
          ref={ref}
          className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
        >
          {/* Left: pitch + stats, sticky on desktop */}
          <div
            data-visible={visible}
            className="reveal-left lg:sticky lg:top-28 lg:self-start"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
              Why it lands
            </span>
            <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              Why sellers stick with Stallio
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-lg">
              It isn&apos;t another dashboard to learn. It removes the four
              things that quietly cost you orders every week.
            </p>
            <CTAButton href="/#final-cta" size="md" className="mt-7">
              Start selling free
            </CTAButton>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-6 sm:max-w-md">
              {stats.map((stat, i) => (
                <StatItem
                  key={stat.label}
                  stat={stat}
                  index={i}
                  visible={visible}
                />
              ))}
            </dl>
          </div>

          {/* Right: connected timeline of reasons */}
          <ol className="relative flex flex-col gap-8 sm:gap-10">
            <span
              aria-hidden="true"
              className="absolute left-6 top-2 bottom-2 hidden w-px bg-ink/10 sm:block"
            />
            {reasons.map((reason, i) => (
              <ReasonRow
                key={reason.title}
                reason={reason}
                index={i}
                visible={visible}
              />
            ))}
          </ol>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function StatItem({
  stat,
  index,
  visible,
}: {
  stat: (typeof stats)[number];
  index: number;
  visible: boolean;
}) {
  const count = useCountUp(stat.value, visible, 900 + index * 150);
  return (
    <div>
      <dt className="sr-only">{stat.label}</dt>
      <dd className="font-display text-2xl font-semibold tabular-nums text-ink sm:text-3xl">
        {count}
        {stat.suffix}
      </dd>
      <p className="mt-1 text-[11px] leading-snug text-ink-faint sm:text-xs">
        {stat.label}
      </p>
    </div>
  );
}

function ReasonRow({
  reason,
  index,
  visible,
}: {
  reason: Reason;
  index: number;
  visible: boolean;
}) {
  const accent = accentClasses[reason.accent];

  return (
    <li
      data-visible={visible}
      className="reveal relative flex gap-5 sm:gap-6"
      style={{ transitionDelay: `${index * 140}ms` }}
    >
      <span
        className={cn(
          "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface ring-1 transition-transform duration-300",
          accent.ring,
        )}
      >
        {/* Opaque backdrop first, so the timeline rail behind never shows through the tint */}
        <span
          aria-hidden="true"
          className={cn("absolute inset-0 rounded-2xl", accent.icon)}
        />
        <reason.icon
          size={20}
          strokeWidth={2}
          className={cn("relative", accent.text)}
        />
        <span
          className={cn(
            "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-surface",
            accent.line,
          )}
        >
          {index + 1}
        </span>
      </span>

      <div className="group flex-1 rounded-2xl border border-transparent px-1 py-1 transition-colors duration-300 hover:border-ink/10">
        <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">
          {reason.title}
        </h3>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
          {reason.description}
        </p>
        <span
          className={cn(
            "mt-4 block h-px w-10 origin-left scale-x-50 rounded-full opacity-40 transition-transform duration-300 group-hover:scale-x-100 group-hover:opacity-100",
            accent.line,
          )}
        />
      </div>
    </li>
  );
}
