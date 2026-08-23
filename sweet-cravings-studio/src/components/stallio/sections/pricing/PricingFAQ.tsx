import { useState } from "react";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { CTAButton } from "../../CTAButton";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type TranslatedFAQ = { question: string; answer: string };

export function PricingFAQ() {
  const { t } = useTranslation("pricing");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = t("faq.items", { returnObjects: true }) as TranslatedFAQ[];

  return (
    <section id="faq" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-teal/12 blur-[140px]"
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div
          ref={ref}
          className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
        >
          {/* Left: still deciding */}
          <div
            data-visible={visible}
            className="reveal-left lg:sticky lg:top-28 lg:self-start"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet sm:text-xs">
              {t("faq.eyebrow")}
            </span>
            <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              {t("faq.title")}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base">
              {t("faq.description")}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:max-w-xs">
              <CTAButton href="/signup" size="lg" className="w-full">
                {t("faq.ctaPrimary")}
                <ArrowRight size={17} />
              </CTAButton>
              <CTAButton
                href="/#contact"
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Mail size={16} />
                {t("faq.ctaSecondary")}
              </CTAButton>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper-dim px-4 py-2 font-mono text-[11px] text-ink-soft">
              <MessageCircle
                size={14}
                className="shrink-0 text-teal"
                strokeWidth={2.2}
              />
              <span>{t("faq.replyTime")}</span>
            </div>
          </div>

          {/* Right: FAQ accordion */}
          <div
            data-visible={visible}
            className="reveal-right divide-y divide-ink/10 overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)]"
          >
            {faqs.map((qa, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={qa.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-paper-dim/60"
                  >
                    <span className="font-display text-sm font-semibold text-ink sm:text-base">
                      {qa.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-faint transition-all duration-300",
                        isOpen && "rotate-180 bg-violet/12 text-violet",
                      )}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">
                        {qa.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10 mt-16 sm:mt-20 lg:mt-24" />
    </section>
  );
}
