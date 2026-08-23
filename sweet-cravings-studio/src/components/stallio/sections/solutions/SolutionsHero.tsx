import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { CTAButton } from "../../CTAButton";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";

export function SolutionsHero() {
  const { t } = useTranslation("solutions");
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-lime/20 blur-[120px]"
        style={{ animation: "drift-c 22s ease-in-out infinite" }}
      />

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div
          ref={ref}
          data-visible={visible}
          className="reveal mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-dim px-4 py-1.5">
            <Sparkles size={14} className="text-lime" strokeWidth={2.5} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
              {t("hero.eyebrow")}
            </span>
          </div>

          <h1 className="mt-6 font-display text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {t("hero.titleLine1")}{" "}
            <span className="bg-[image:var(--gradient-warm)] bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <CTAButton href="#browse" size="lg">
              {t("hero.ctaPrimary")}
            </CTAButton>
            <CTAButton href="/signup" variant="outline" size="lg">
              {t("hero.ctaSecondary")}
              <ArrowRight size={16} />
            </CTAButton>
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
