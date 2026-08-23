import { useState } from "react";
import {
  Shirt,
  Cookie,
  Sparkles,
  Gem,
  Recycle,
  Palette,
  ArrowRight,
  CircleX,
  CircleCheck,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { CTAButton } from "../../CTAButton";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";
import prod5 from "@/assets/prod-5.jpg";
import prod6 from "@/assets/prod-6.jpg";

type SegmentId =
  | "boutiques"
  | "bakers"
  | "skincare"
  | "jewelry"
  | "thrift"
  | "crafts";

const segments: { id: SegmentId; icon: LucideIcon; image: string }[] = [
  { id: "boutiques", icon: Shirt, image: prod1 },
  { id: "bakers", icon: Cookie, image: prod3 },
  { id: "skincare", icon: Sparkles, image: prod5 },
  { id: "jewelry", icon: Gem, image: prod4 },
  { id: "thrift", icon: Recycle, image: prod2 },
  { id: "crafts", icon: Palette, image: prod6 },
];

const pointKeys = ["p1", "p2", "p3"];

export function SolutionsSwitcher() {
  const { t } = useTranslation("solutions");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [activeId, setActiveId] = useState<SegmentId>(segments[0]!.id);
  const active = segments.find((s) => s.id === activeId) ?? segments[0]!;

  return (
    <section id="browse" className="relative overflow-hidden bg-paper-dim">
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div
          ref={ref}
          data-visible={visible}
          className="reveal mx-auto max-w-2xl text-center"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            {t("switcher.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {t("switcher.title")}
          </h2>
        </div>

        {/* Pill switcher */}
        <div
          role="tablist"
          aria-label={t("switcher.tablistLabel")}
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:mt-10"
        >
          {segments.map((seg) => {
            const isActive = seg.id === activeId;
            return (
              <button
                key={seg.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(seg.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm",
                  isActive
                    ? "border-transparent bg-violet text-white shadow-md shadow-violet/25"
                    : "border-ink/12 bg-surface text-ink-soft hover:border-violet/30 hover:text-ink",
                )}
              >
                <seg.icon size={15} strokeWidth={2} />
                {t(`switcher.segments.${seg.id}.label`)}
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-[2rem] border border-ink/10 bg-surface sm:mt-12">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative h-48 sm:h-64 lg:h-full">
              <img
                src={active.image}
                alt={t(`switcher.segments.${active.id}.label`)}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[image:linear-gradient(to_top,rgba(10,7,25,0.75),transparent_55%)] lg:bg-[image:linear-gradient(to_right,transparent_55%,rgba(10,7,25,0.55))]"
              />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur">
                <active.icon size={14} className="text-violet" strokeWidth={2} />
                {t(`switcher.segments.${active.id}.label`)}
              </span>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coral/12 text-coral">
                  <CircleX size={15} strokeWidth={2.5} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                    {t("switcher.usualProblem")}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft sm:text-base">
                    {t(`switcher.segments.${active.id}.pain`)}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal/12 text-teal">
                  <CircleCheck size={15} strokeWidth={2.5} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-teal">
                    {t("switcher.howStallioFixes")}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink sm:text-base">
                    {t(`switcher.segments.${active.id}.fix`)}
                  </p>
                </div>
              </div>

              <ul className="mt-6 flex flex-col gap-2 border-t border-ink/10 pt-5">
                {pointKeys.map((pKey) => (
                  <li
                    key={pKey}
                    className="flex items-center gap-2.5 text-xs text-ink-soft sm:text-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet"
                    />
                    {t(`switcher.segments.${active.id}.points.${pKey}`)}
                  </li>
                ))}
              </ul>

              <CTAButton href="/signup" className="mt-7 w-full sm:w-auto">
                {t(`switcher.segments.${active.id}.ctaAs`)}
                <ArrowRight size={15} />
              </CTAButton>
            </div>
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
