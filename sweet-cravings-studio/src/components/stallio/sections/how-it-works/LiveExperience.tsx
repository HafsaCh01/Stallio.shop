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
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type View = {
  id: "dashboard" | "storefront";
  label: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  points: { icon: LucideIcon; text: string }[];
};

const views: View[] = [
  {
    id: "dashboard",
    label: "Your dashboard",
    icon: LayoutGrid,
    eyebrow: "Behind the scenes",
    title: "You see control.",
    description:
      "Orders, products, and requests in one view. Update stock between deliveries without opening ten apps.",
    points: [
      { icon: FileText, text: "Mark paid, ship, and download invoice PDFs" },
      { icon: Tag, text: "Coupons, delivery, and stock in one place" },
      { icon: Boxes, text: "Export orders or add a manual phone order" },
    ],
  },
  {
    id: "storefront",
    label: "Their storefront",
    icon: Smartphone,
    eyebrow: "What buyers see",
    title: "They see polish.",
    description:
      "Categories, cart, coupons, and checkout, built for the phone. Buyers can switch English, Spanish, or Arabic on your store.",
    points: [
      { icon: ShoppingBag, text: "Cart and checkout in a couple of taps" },
      { icon: Globe, text: "Three languages, switched instantly" },
      { icon: CreditCard, text: "Coupons applied before they ask" },
    ],
  },
];

export function LiveExperience() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [activeId, setActiveId] = useState<View["id"]>("dashboard");
  const active = views.find((v) => v.id === activeId)!;

  return (
    <section id="live" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-pink/15 blur-[140px]"
        style={{ animation: "drift-c 25s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal sm:text-xs">
            When you're live
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            One storefront, two sides.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            A fast link on the outside. A calm dashboard on the inside. Flip the
            toggle to see both.
          </p>
        </div>

        <div
          ref={ref}
          data-visible={visible}
          className="reveal mx-auto mt-10 max-w-3xl sm:mt-12"
        >
          {/* Toggle */}
          <div className="mx-auto flex w-fit gap-1 rounded-full border border-ink/10 bg-paper-dim p-1">
            {views.map((view) => (
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
                <view.icon size={14} />
                {view.label}
              </button>
            ))}
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
                <active.icon size={26} strokeWidth={1.8} />
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

                <ul className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t-0 sm:pt-0">
                  {active.points.map((point) => (
                    <li
                      key={point.text}
                      className="flex items-start gap-2.5 rounded-xl border border-ink/10 bg-surface/60 p-3 text-xs font-medium text-ink sm:flex-col sm:gap-2 sm:text-sm"
                    >
                      <point.icon size={15} className="shrink-0 text-lime" />
                      {point.text}
                    </li>
                  ))}
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
