import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { CTAButton } from "../../CTAButton";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";

export function PricingHero() {
  const { t } = useTranslation("pricing");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const trustBullets = t("hero.trustBullets", { returnObjects: true }) as string[];
  const cardBullets = t("hero.cardBullets", { returnObjects: true }) as string[];

  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet/25 blur-[140px]"
        style={{ animation: "drift-c 24s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-teal/15 blur-[130px]"
        style={{ animation: "drift-a 26s ease-in-out infinite" }}
      />

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.75fr] lg:gap-12">
          <div ref={ref} data-visible={visible} className="reveal-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-dim px-4 py-1.5">
              <Sparkles size={14} className="text-lime" strokeWidth={2.5} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="mt-6 font-display text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.3rem]">
              {t("hero.titleLead")}{" "}
              <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {t("hero.description")}
            </p>

            <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {trustBullets.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-snug text-ink-soft sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
              <CTAButton href="#plan" size="lg">
                {t("hero.ctaPrimary")}
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </CTAButton>
              <CTAButton href="#plan" variant="outline" size="lg">
                {t("hero.ctaSecondary")}
              </CTAButton>
            </div>
          </div>

          {/* Signature element: a clean price card, mirroring the card
              language used everywhere else on the page. */}
          <div
            data-visible={visible}
            className="reveal-right relative mx-auto w-full max-w-[17rem]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-violet/15 blur-3xl"
            />

            <div className="relative overflow-visible rounded-3xl border border-ink/10 bg-surface p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.4)]">
              <span className="absolute -right-3 -top-3 whitespace-nowrap rounded-full bg-amber px-3 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-navy shadow-sm">
                {t("hero.firstMonthFree")}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet/15 px-3 py-1">
                <Sparkles size={11} className="text-violet" strokeWidth={2.5} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet">
                  {t("hero.onePlan")}
                </span>
              </span>

              <div className="mt-5 flex items-end gap-1.5">
                <span className="font-display text-5xl font-semibold tracking-tight text-ink">
                  $5
                </span>
                <span className="pb-1.5 text-sm text-ink-faint">
                  {t("hero.perMonth")}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-faint">{t("hero.orYearly")}</p>

              <div className="my-5 h-px w-full bg-ink/10" />

              <ul className="flex flex-col gap-2.5">
                {cardBullets.map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-snug text-ink-soft">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
