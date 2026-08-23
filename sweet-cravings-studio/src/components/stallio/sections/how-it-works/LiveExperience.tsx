import { useState } from "react";
import {
  LayoutGrid,
  Smartphone,
  FileText,
  Tag,
  Boxes,
  ShoppingBag,
  Globe,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type ViewId = "dashboard" | "storefront";

const viewIds: ViewId[] = ["dashboard", "storefront"];
const viewIcons: Record<ViewId, LucideIcon> = {
  dashboard: LayoutGrid,
  storefront: Smartphone,
};
const viewPointIcons: Record<ViewId, LucideIcon[]> = {
  dashboard: [FileText, Tag, Boxes],
  storefront: [ShoppingBag, Globe, CreditCard],
};

type TranslatedView = {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
};

export function LiveExperience() {
  const { t } = useTranslation("howItWorks");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [activeId, setActiveId] = useState<ViewId>("dashboard");

  const translatedViews = t("liveExperience.views", {
    returnObjects: true,
  }) as TranslatedView[];
  const views = viewIds.map((id, i) => ({
    id,
    icon: viewIcons[id],
    pointIcons: viewPointIcons[id],
    ...translatedViews[i]!,
  }));

  const active = views.find((v) => v.id === activeId)!;
  const ActiveIcon = active.icon;

  return (
    <section id="live" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-pink/15 blur-[140px]"
        style={{ animation: "drift-c 25s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet sm:text-xs">
            {t("liveExperience.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {t("liveExperience.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            {t("liveExperience.description")}
          </p>
        </div>

        <div
          ref={ref}
          data-visible={visible}
          className="reveal mx-auto mt-10 max-w-3xl sm:mt-12"
        >
          {/* Toggle */}
          <div className="mx-auto flex w-fit gap-1 rounded-full border border-ink/10 bg-paper-dim p-1">
            {views.map((view) => {
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setActiveId(view.id)}
                  aria-pressed={view.id === activeId}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:px-5 sm:text-sm",
                    view.id === activeId
                      ? "bg-surface text-ink shadow-md"
                      : "text-ink-faint hover:text-ink-soft",
                  )}
                >
                  <Icon size={14} />
                  {view.label}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            key={active.id}
            className="animate-fade-up group relative mt-6 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-[image:linear-gradient(160deg,color-mix(in_srgb,var(--violet)_8%,var(--surface)),var(--surface)_55%)] p-6 sm:mt-8 sm:p-10"
          >
            <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-10">
              <span
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg shadow-violet/25 sm:h-16 sm:w-16",
                  "bg-[image:var(--gradient-brand)]",
                )}
              >
                <ActiveIcon size={26} strokeWidth={1.8} />
              </span>

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet sm:text-xs">
                  {active.eyebrow}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
                  {active.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
                  {active.description}
                </p>

                <ul className="mt-6 flex flex-col divide-y divide-ink/10 border-t border-ink/10 pt-1 sm:grid sm:grid-cols-3 sm:gap-px sm:divide-y-0 sm:border-t-0 sm:pt-0 sm:overflow-hidden sm:rounded-xl sm:border sm:border-ink/10 sm:bg-ink/10">
                  {active.points.map((point, i) => {
                    const PointIcon = active.pointIcons[i]!;
                    return (
                      <li
                        key={point}
                        className="flex items-center gap-3 bg-surface/70 px-1 py-3.5 text-xs font-medium text-ink-soft transition-colors duration-200 hover:bg-surface hover:text-ink sm:flex-col sm:items-start sm:gap-2.5 sm:px-4 sm:py-4 sm:text-sm"
                      >
                        <PointIcon
                          size={15}
                          strokeWidth={2}
                          className="shrink-0 text-violet"
                        />
                        <span className="leading-snug">{point}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
