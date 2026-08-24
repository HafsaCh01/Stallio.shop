import { ArrowRight, Link2, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../Container";
import { CTAButton } from "../CTAButton";
import { useReveal } from "@/hooks/use-reveal";

const perkIcons = [Sparkles, Link2, ShieldCheck];

type TranslatedPerk = { label: string };

export function FinalCTA() {
  const { t } = useTranslation("home");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const perks = t("finalCta.perks", { returnObjects: true }) as TranslatedPerk[];

  return (
    <section id="final-cta" className="relative overflow-hidden bg-paper">
      <Container className="py-16 sm:py-20 lg:py-28">
        <div
          ref={ref}
          data-visible={visible}
          className="reveal relative overflow-hidden rounded-[2rem] border border-violet/30 bg-paper-dim px-6 py-12 text-center sm:px-10 sm:py-16 lg:px-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet/30 blur-[100px]"
            style={{ animation: "drift-a 20s ease-in-out infinite" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-pink/25 blur-[100px]"
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
              {t("finalCta.badge")}
            </span>

            <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              {t("finalCta.titleLead")}{" "}
              <span className="bg-[image:var(--gradient-warm)] bg-clip-text text-transparent">
                {t("finalCta.titleHighlight")}
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-lg">
              {t("finalCta.description")}
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <CTAButton href="/signup" size="lg">
                {t("finalCta.ctaPrimary")}
                <ArrowRight
                  size={17}
                  className="icon-directional transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                />
              </CTAButton>
              <CTAButton href="#how-it-works" variant="outline" size="lg">
                {t("finalCta.ctaSecondary")}
              </CTAButton>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-ink-soft sm:text-sm">
              {perks.map((perk, i) => {
                const Icon = perkIcons[i]!;
                return (
                  <li key={perk.label} className="flex items-center gap-2">
                    <Icon size={15} className="shrink-0 text-teal" />
                    {perk.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
