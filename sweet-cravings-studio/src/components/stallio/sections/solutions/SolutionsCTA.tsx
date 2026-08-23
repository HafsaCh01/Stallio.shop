import { ArrowRight, Link2, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { CTAButton } from "../../CTAButton";
import { useReveal } from "@/hooks/use-reveal";

const perkKeys = ["freeToStart", "noDomain", "noCard"];
const perkIcons = [Sparkles, Link2, ShieldCheck];

export function SolutionsCTA() {
  const { t } = useTranslation("solutions");
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-violet/30 blur-[160px]"
        style={{ animation: "drift-a 24s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-lime/15 blur-[140px]"
        style={{ animation: "drift-b 28s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div
          ref={ref}
          data-visible={visible}
          className="reveal mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-[2rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl">
            {t("cta.title")}
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-lg">
            {t("cta.subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <CTAButton href="/signup" size="lg">
              {t("cta.ctaPrimary")}
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </CTAButton>
            <CTAButton
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:border-teal hover:text-teal"
            >
              {t("cta.ctaSecondary")}
            </CTAButton>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70 sm:text-sm">
            {perkKeys.map((key, i) => {
              const Icon = perkIcons[i]!;
              return (
                <li key={key} className="flex items-center gap-2">
                  <Icon size={15} className="shrink-0 text-teal" />
                  {t(`cta.perks.${key}`)}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
