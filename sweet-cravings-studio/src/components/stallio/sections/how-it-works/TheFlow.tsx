import { useEffect, useState } from "react";
import {
  UserPlus,
  PackagePlus,
  Share2,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Accent = "violet" | "teal" | "pink";
const stepNumbers = ["01", "02", "03"];
const stepIcons: LucideIcon[] = [UserPlus, PackagePlus, Share2];
const stepAccents: Accent[] = ["violet", "teal", "pink"];

type TranslatedStep = { title: string; description: string; bullets: string[] };

const accentStyles: Record<
  Accent,
  { ring: string; text: string; badge: string; bar: string }
> = {
  violet: { ring: "ring-violet/30", text: "text-violet", badge: "bg-violet text-white", bar: "bg-violet" },
  teal: { ring: "ring-teal/30", text: "text-teal", badge: "bg-teal text-white", bar: "bg-teal" },
  pink: { ring: "ring-pink/30", text: "text-pink", badge: "bg-pink text-white", bar: "bg-pink" },
};

const AUTO_MS = 4200;

export function TheFlow() {
  const { t } = useTranslation("howItWorks");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const translatedSteps = t("theFlow.steps", {
    returnObjects: true,
  }) as TranslatedStep[];
  const steps = stepNumbers.map((number, i) => ({
    number,
    icon: stepIcons[i]!,
    accent: stepAccents[i]!,
    title: translatedSteps[i]?.title ?? "",
    description: translatedSteps[i]?.description ?? "",
    bullets: translatedSteps[i]?.bullets ?? [],
  }));

  useEffect(() => {
    if (paused || !visible) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, visible, steps.length]);

  const current = steps[active] ?? steps[0]!;
  const accent = accentStyles[current.accent];
  const CurrentIcon = current.icon;

  return (
    <section id="flow" className="relative overflow-hidden bg-paper-dim">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6%] top-[10%] h-80 w-80 rounded-full bg-teal/15 blur-[130px]"
        style={{ animation: "drift-b 26s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet sm:text-xs">
            {t("theFlow.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {t("theFlow.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            {t("theFlow.description")}
          </p>
        </div>

        <div
          ref={ref}
          data-visible={visible}
          className="reveal mx-auto mt-12 max-w-4xl sm:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Step tabs + progress rail */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-10 hidden h-0.5 rounded-full bg-ink/10 sm:block"
            />
            <div
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-10 hidden h-0.5 rounded-full transition-all duration-500 sm:block",
                accent.bar,
              )}
              style={{
                width:
                  steps.length > 1
                    ? `${(active / (steps.length - 1)) * 100}%`
                    : "0%",
              }}
            />

            <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {steps.map((step, i) => {
                const stepAccent = accentStyles[step.accent];
                const isActive = i === active;
                const isDone = i < active;
                const StepIcon = step.icon;
                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 sm:flex-col sm:items-center sm:text-center",
                      isActive
                        ? "border-ink/15 bg-surface shadow-lg"
                        : "border-transparent hover:bg-surface/60",
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-paper-dim ring-1 transition-all duration-300 sm:h-14 sm:w-14",
                        isActive &&
                          "bg-[image:var(--gradient-brand)] text-white ring-transparent",
                        !isActive && stepAccent.ring,
                        !isActive && stepAccent.text,
                      )}
                    >
                      {isDone ? (
                        <Check size={18} strokeWidth={2.5} />
                      ) : (
                        <StepIcon size={isActive ? 22 : 20} strokeWidth={2} />
                      )}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block font-display text-[10px] font-semibold tracking-wider",
                          isActive ? stepAccent.text : "text-ink-faint",
                        )}
                      >
                        {t("theFlow.stepLabel", { number: step.number })}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block text-sm font-semibold sm:text-base",
                          isActive ? "text-ink" : "text-ink-soft",
                        )}
                      >
                        {step.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active step detail panel */}
          <div
            key={current.number}
            className="animate-fade-up mt-6 rounded-[1.75rem] border border-ink/10 bg-surface p-6 sm:mt-8 sm:p-9"
          >
            <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-10">
              <div>
                <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
                  {current.description}
                </p>

                <ul className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:grid sm:grid-cols-1 sm:gap-3">
                  {current.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm font-medium text-ink"
                    >
                      <span
                        className={cn(
                          "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                          accent.badge,
                        )}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden shrink-0 flex-col items-center justify-center rounded-2xl bg-paper-dim px-8 py-6 sm:flex">
                <span
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-2xl ring-1",
                    accent.ring,
                    accent.text,
                  )}
                >
                  <CurrentIcon size={28} strokeWidth={1.8} />
                </span>
                <span className="mt-3 font-display text-3xl font-bold text-ink">
                  {current.number}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
                  {t("theFlow.ofTotal", { total: steps.length })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
