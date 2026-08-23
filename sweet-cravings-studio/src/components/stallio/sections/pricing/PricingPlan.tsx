import { useState } from "react";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { CTAButton } from "../../CTAButton";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

export function PricingPlan() {
  const { t } = useTranslation("pricing");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [billing, setBilling] = useState<Billing>("monthly");
  const items = t("plan.items", { returnObjects: true }) as string[];

  const price = billing === "monthly" ? "$5" : "$50";
  const unit = billing === "monthly" ? t("plan.perMonth") : t("plan.perYear");

  return (
    <section id="plan" className="relative overflow-hidden bg-paper-dim">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-8%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-violet/15 blur-[150px]"
        style={{ animation: "drift-c 28s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            {t("plan.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            {t("plan.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            {t("plan.description")}
          </p>
        </div>

        <div
          ref={ref}
          data-visible={visible}
          className="reveal relative mx-auto mt-12 w-full max-w-4xl sm:mt-14"
        >
          <div className="grid overflow-hidden rounded-[2rem] border border-ink/10 bg-surface shadow-[0_50px_100px_-40px_rgba(0,0,0,0.5)] lg:grid-cols-[19rem_1fr]">
            {/* Left: price panel */}
            <div className="relative flex flex-col justify-between gap-8 overflow-hidden border-b border-ink/10 bg-paper-dim p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-violet/20 blur-3xl"
              />

              <div className="relative">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-violet/15 px-3 py-1.5">
                  <Sparkles size={12} className="text-violet" strokeWidth={2.5} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet">
                    {t("plan.planName")}
                  </span>
                </div>

                {/* Billing toggle, clean segmented pill */}
                <div className="relative mt-6 inline-flex items-center gap-1 rounded-full border border-ink/10 bg-surface p-1">
                  <ToggleButton
                    active={billing === "monthly"}
                    onClick={() => setBilling("monthly")}
                  >
                    {t("plan.monthly")}
                  </ToggleButton>
                  <ToggleButton
                    active={billing === "yearly"}
                    onClick={() => setBilling("yearly")}
                  >
                    {t("plan.yearly")}
                  </ToggleButton>
                  <span className="absolute -right-2.5 -top-3 whitespace-nowrap rounded-full bg-amber px-1.5 py-0.5 text-[9px] font-bold text-navy shadow-sm">
                    {t("plan.saveAmount")}
                  </span>
                </div>

                <div className="mt-7 flex items-end gap-1.5">
                  <span className="font-display text-5xl font-bold tracking-tight text-ink">
                    {price}
                  </span>
                  <span className="pb-1.5 text-sm font-medium text-ink-faint">
                    {unit}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-faint">
                  {billing === "monthly"
                    ? t("plan.orBilledYearly")
                    : t("plan.billedOnceYear")}
                </p>
              </div>

              <div className="relative flex flex-col gap-4">
                <div className="rounded-2xl border border-ink/10 bg-surface px-4 py-3.5">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                    {t("plan.dueToday")}
                  </span>
                  <span className="block font-mono text-2xl font-semibold text-ink">
                    $0.00
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-soft">
                    {t("plan.firstMonthFree")}
                  </span>
                </div>

                <CTAButton href="/signup" size="lg" className="w-full">
                  {t("plan.ctaPrimary")}
                </CTAButton>

                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink-faint">
                  <ShieldCheck size={13} className="text-lime" />
                  {t("plan.cancelAnytime")}
                </p>
              </div>
            </div>

            {/* Right: itemized checklist */}
            <div className="bg-surface p-8 sm:p-10 lg:p-9">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                {t("plan.itemizedLabel")}
              </span>
              <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-snug text-ink">
                      {item}
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

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-300",
        active
          ? "bg-violet text-white"
          : "text-ink-faint hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
