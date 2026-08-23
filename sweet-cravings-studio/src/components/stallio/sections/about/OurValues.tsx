import {
  Users,
  ShieldCheck,
  Compass,
  Rocket,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const principleIcons: LucideIcon[] = [Users, ShieldCheck, Compass, Rocket, Heart];

type TranslatedPrinciple = { title: string; description: string };

export function OurValues() {
  const { t } = useTranslation("about");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const principles = t("ourValues.principles", {
    returnObjects: true,
  }) as TranslatedPrinciple[];

  return (
    <section id="how-we-think" className="relative overflow-hidden bg-paper-dim">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8%] top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-violet/15 blur-[140px]"
        style={{ animation: "drift-c 24s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            {t("ourValues.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {t("ourValues.title")}
          </h2>
        </div>

        <div ref={ref} className="mx-auto mt-14 max-w-3xl divide-y divide-ink/10 lg:mt-16">
          {principles.map((principle, i) => (
            <PrincipleRow
              key={principle.title}
              principle={principle}
              icon={principleIcons[i]!}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function PrincipleRow({
  principle,
  icon: Icon,
  index,
  visible,
}: {
  principle: TranslatedPrinciple;
  icon: LucideIcon;
  index: number;
  visible: boolean;
}) {
  return (
    <div
      data-visible={visible}
      className="reveal group grid grid-cols-[3rem_1fr] items-start gap-4 py-7 transition-colors sm:grid-cols-[5rem_auto_1fr] sm:items-center sm:gap-6"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <span className="font-display text-3xl font-semibold text-ink/15 transition-colors duration-300 group-hover:text-violet/40 sm:text-4xl">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className={cn(
          "hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet/15 text-violet transition-all duration-300 group-hover:scale-110 group-hover:bg-[image:var(--gradient-brand)] group-hover:text-ink sm:flex",
        )}
      >
        <Icon size={20} strokeWidth={2} />
      </span>

      <div>
        <div className="flex items-center gap-2.5 sm:hidden">
          <Icon size={18} strokeWidth={2} className="text-violet" />
          <h3 className="font-display text-base font-semibold text-ink">
            {principle.title}
          </h3>
        </div>
        <h3 className="hidden font-display text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-violet sm:block sm:text-xl">
          {principle.title}
        </h3>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
          {principle.description}
        </p>
      </div>
    </div>
  );
}
