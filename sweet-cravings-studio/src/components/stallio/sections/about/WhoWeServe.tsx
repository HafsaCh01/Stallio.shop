import {
  Zap,
  LayoutGrid,
  Link2,
  ClipboardList,
  Store,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Accent = "violet" | "teal" | "amber" | "pink" | "lime" | "coral";

const featureIcons: LucideIcon[] = [
  Zap,
  LayoutGrid,
  Link2,
  ClipboardList,
  Store,
  FileText,
];
const featureAccents: Accent[] = [
  "violet",
  "teal",
  "amber",
  "pink",
  "lime",
  "coral",
];

const accentClasses: Record<
  Accent,
  { icon: string; text: string; ring: string; line: string }
> = {
  violet: { icon: "bg-violet/15", text: "text-violet", ring: "ring-violet/40", line: "bg-violet" },
  teal: { icon: "bg-teal/15", text: "text-teal", ring: "ring-teal/40", line: "bg-teal" },
  amber: { icon: "bg-amber/15", text: "text-amber", ring: "ring-amber/40", line: "bg-amber" },
  pink: { icon: "bg-pink/15", text: "text-pink", ring: "ring-pink/40", line: "bg-pink" },
  lime: { icon: "bg-lime/15", text: "text-lime", ring: "ring-lime/40", line: "bg-lime" },
  coral: { icon: "bg-coral/15", text: "text-coral", ring: "ring-coral/40", line: "bg-coral" },
};

type TranslatedFeature = { title: string; description: string };

export function WhoWeServe() {
  const { t } = useTranslation("about");
  const { ref, visible } = useReveal<HTMLOListElement>();
  const features = t("whoWeServe.features", {
    returnObjects: true,
  }) as TranslatedFeature[];

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
            {t("whoWeServe.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {t("whoWeServe.title")}
          </h2>
        </div>

        <ol
          ref={ref}
          className="relative mx-auto mt-14 flex max-w-3xl flex-col gap-8 lg:mt-16 sm:gap-10"
        >
          <span
            aria-hidden="true"
            className="absolute start-6 top-2 bottom-2 hidden w-px bg-ink/10 sm:block"
          />
          {features.map((feature, i) => (
            <FeatureRow
              key={feature.title}
              feature={feature}
              icon={featureIcons[i]!}
              accent={featureAccents[i]!}
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
  icon: Icon,
  accent: accentKey,
  index,
  visible,
}: {
  feature: TranslatedFeature;
  icon: LucideIcon;
  accent: Accent;
  index: number;
  visible: boolean;
}) {
  const accent = accentClasses[accentKey];
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
        <span
          aria-hidden="true"
          className={cn("absolute inset-0 rounded-2xl", accent.icon)}
        />
        <Icon size={20} strokeWidth={2} className={cn("relative", accent.text)} />
      </span>

      <div className="group flex-1 rounded-2xl border border-transparent px-1 py-1 transition-colors duration-300 hover:border-ink/10">
        <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">
          {feature.title}
        </h3>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
          {feature.description}
        </p>
      </div>
    </li>
  );
}
