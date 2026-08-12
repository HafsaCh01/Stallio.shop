import {
  Zap,
  LayoutGrid,
  Link2,
  ClipboardList,
  Store,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "violet" | "teal" | "pink" | "amber" | "lime" | "coral";
};

const features: Feature[] = [
  {
    icon: Zap,
    title: "Live in minutes",
    description:
      "Sign up, name your store, pick your URL path. No technical setup.",
    accent: "violet",
  },
  {
    icon: LayoutGrid,
    title: "Products with photos and prices",
    description:
      "Upload images, set prices and descriptions. Keep everything in one place.",
    accent: "teal",
  },
  {
    icon: Link2,
    title: "One link everywhere",
    description:
      "Bio, stories, chats: the same link works on any platform your buyers use.",
    accent: "amber",
  },
  {
    icon: ClipboardList,
    title: "Orders in one dashboard",
    description:
      "See requests, update stock, and stay on top of fulfillment without digging through DMs.",
    accent: "pink",
  },
  {
    icon: Store,
    title: "Storefront buyers trust",
    description:
      "Fast, mobile-first layout so your catalog feels intentional, not improvised.",
    accent: "lime",
  },
  {
    icon: FileText,
    title: "Seller tools included",
    description:
      "Mark orders paid, track delivery, export CSV, and download invoice PDFs without extra apps.",
    accent: "coral",
  },
];

const accentClasses: Record<
  Feature["accent"],
  { icon: string; text: string; ring: string; line: string }
> = {
  violet: {
    icon: "bg-violet/15",
    text: "text-violet",
    ring: "ring-violet/40",
    line: "bg-violet",
  },
  teal: {
    icon: "bg-teal/15",
    text: "text-teal",
    ring: "ring-teal/40",
    line: "bg-teal",
  },
  amber: {
    icon: "bg-amber/15",
    text: "text-amber",
    ring: "ring-amber/40",
    line: "bg-amber",
  },
  pink: {
    icon: "bg-pink/15",
    text: "text-pink",
    ring: "ring-pink/40",
    line: "bg-pink",
  },
  lime: {
    icon: "bg-lime/15",
    text: "text-lime",
    ring: "ring-lime/40",
    line: "bg-lime",
  },
  coral: {
    icon: "bg-coral/15",
    text: "text-coral",
    ring: "ring-coral/40",
    line: "bg-coral",
  },
};

export function WhoWeServe() {
  const { ref, visible } = useReveal<HTMLOListElement>();

  return (
    <section id="what-you-get" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[10%] h-96 w-96 rounded-full bg-violet/12 blur-[150px]"
        style={{ animation: "drift-b 25s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            What you get
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Everything in one loop: show, sell, ship.
          </h2>
        </div>

        <ol
          ref={ref}
          className="relative mx-auto mt-14 flex max-w-3xl flex-col gap-8 lg:mt-16 sm:gap-10"
        >
          <span
            aria-hidden="true"
            className="absolute left-6 top-2 bottom-2 hidden w-px bg-ink/10 sm:block"
          />
          {features.map((feature, i) => (
            <FeatureRow
              key={feature.title}
              feature={feature}
              index={i}
              visible={visible}
            />
          ))}
        </ol>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function FeatureRow({
  feature,
  index,
  visible,
}: {
  feature: Feature;
  index: number;
  visible: boolean;
}) {
  const accent = accentClasses[feature.accent];
  const fromLeft = index % 2 === 0;

  return (
    <li
      data-visible={visible}
      className={cn(
        fromLeft ? "reveal-left" : "reveal-right",
        "relative flex gap-5 sm:gap-6",
      )}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <span
        className={cn(
          "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface ring-1 transition-transform duration-300 hover:scale-110",
          accent.ring,
        )}
      >
        {/* Opaque backdrop first, so the timeline rail behind never shows through the tint */}
        <span
          aria-hidden="true"
          className={cn("absolute inset-0 rounded-2xl", accent.icon)}
        />
        <feature.icon
          size={20}
          strokeWidth={2}
          className={cn("relative", accent.text)}
        />
      </span>

      <div className="group flex-1 rounded-2xl border border-transparent px-1 py-1 transition-colors duration-300 hover:border-ink/10">
        <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">
          {feature.title}
        </h3>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
          {feature.description}
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
