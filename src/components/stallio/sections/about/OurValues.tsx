import {
  Feather,
  Smartphone,
  Unlock,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";

type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const values: Value[] = [
  {
    icon: Feather,
    title: "Simple by default",
    description:
      "If a feature needs a tutorial, we've done something wrong. Every part of Stallio should make sense the first time.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first, always",
    description:
      "Sellers and buyers meet us on a phone. We design and test there first — desktop is the afterthought, not the phone.",
  },
  {
    icon: Unlock,
    title: "No gatekeeping",
    description:
      "No domain to buy, no payment gateway approval to wait on, no card required to start. A store shouldn't cost you before it earns you anything.",
  },
  {
    icon: HeartHandshake,
    title: "Seller-first, not platform-first",
    description:
      "We build for the person behind the storefront, not just the metrics. Your catalog, your customers, your rules.",
  },
];

export function OurValues() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="our-values" className="relative bg-paper">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            What we believe
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            The principles behind every decision
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            These aren&apos;t values on a wall — they&apos;re the questions we
            ask before shipping anything new.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-6"
        >
          {values.map((value, i) => (
            <div
              key={value.title}
              data-visible={visible}
              className="reveal h-full"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <ValueCard {...value} />
            </div>
          ))}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function ValueCard({ icon: Icon, title, description }: Value) {
  return (
    <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-ink/10 bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/40 hover:bg-surface sm:p-7">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[image:var(--gradient-brand)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30" />

      <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/15 text-lime transition-colors duration-300 group-hover:bg-[image:var(--gradient-brand)] group-hover:text-ink">
        <Icon size={22} strokeWidth={2} />
      </span>

      <div className="relative">
        <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {description}
        </p>
      </div>
    </div>
  );
}
