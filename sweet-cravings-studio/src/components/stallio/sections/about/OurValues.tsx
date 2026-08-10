import {
  Users,
  ShieldCheck,
  Compass,
  Rocket,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Principle = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const principles: Principle[] = [
  {
    icon: Users,
    title: "Built for real sellers",
    description:
      "Home kitchens, studios, and side hustles. Not enterprise procurement.",
  },
  {
    icon: ShieldCheck,
    title: "Straightforward by design",
    description:
      "Fewer knobs and plugins. A clear path from catalog to order.",
  },
  {
    icon: Compass,
    title: "Room to grow",
    description:
      "Start small, add products and polish as your audience grows with you.",
  },
  {
    icon: Rocket,
    title: "Built for momentum",
    description:
      "Whether you are testing a new line or shipping every week, Stallio is meant to stay out of the way: update products, tweak copy, and keep selling without rebuilding a whole site.",
  },
  {
    icon: Heart,
    title: "Our vision",
    description:
      "We want independent sellers to have tools that feel premium and honest: clear pricing, clear fulfillment, and a storefront that respects the buyer's time as much as yours.",
  },
];

export function OurValues() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="how-we-think" className="relative overflow-hidden bg-paper-dim">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8%] top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-violet/15 blur-[140px]"
        style={{ animation: "drift-c 24s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            How we think
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Principles behind the product
          </h2>
        </div>

        <div ref={ref} className="mx-auto mt-14 max-w-3xl divide-y divide-ink/10 lg:mt-16">
          {principles.map((principle, i) => (
            <PrincipleRow
              key={principle.title}
              principle={principle}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function PrincipleRow({
  principle,
  index,
  visible,
}: {
  principle: Principle;
  index: number;
  visible: boolean;
}) {
  return (
    <div
      data-visible={visible}
      className="reveal group grid grid-cols-[3rem_1fr] items-start gap-4 py-7 transition-colors sm:grid-cols-[5rem_auto_1fr] sm:items-center sm:gap-6"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <span className="font-display text-3xl font-semibold text-ink/15 transition-colors duration-300 group-hover:text-violet/40 sm:text-4xl">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className={cn(
          "hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet/15 text-violet transition-all duration-300 group-hover:scale-110 group-hover:bg-[image:var(--gradient-brand)] group-hover:text-ink sm:flex",
        )}
      >
        <principle.icon size={20} strokeWidth={2} />
      </span>

      <div>
        <div className="flex items-center gap-2.5 sm:hidden">
          <principle.icon size={18} strokeWidth={2} className="text-violet" />
          <h3 className="font-display text-base font-semibold text-ink">
            {principle.title}
          </h3>
        </div>
        <h3 className="hidden font-display text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-violet sm:block sm:text-xl">
          {principle.title}
        </h3>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
          {principle.description}
        </p>
      </div>
    </div>
  );
}
