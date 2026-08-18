import { Store, Wallet, BarChart3, Check, type LucideIcon } from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Group = {
  icon: LucideIcon;
  accent: "violet" | "teal" | "pink";
  title: string;
  blurb: string;
  items: string[];
};

const groups: Group[] = [
  {
    icon: Store,
    accent: "violet",
    title: "Your storefront",
    blurb: "The link customers actually see.",
    items: [
      "Hosted stallio.shop link, no domain to buy",
      "Mobile-first storefront, cart, and checkout",
      "Variants, sale prices, and stock tracking",
      "About and Contact pages, ready to fill in",
    ],
  },
  {
    icon: Wallet,
    accent: "teal",
    title: "Orders & payments",
    blurb: "What happens after someone hits buy.",
    items: [
      "Unlimited products, photos, and orders",
      "Coupons and delivery fees at checkout",
      "A PDF invoice generated per order",
      "Mark paid, ship, and export orders to CSV",
    ],
  },
  {
    icon: BarChart3,
    accent: "pink",
    title: "Tools & insight",
    blurb: "How you keep track of the shop.",
    items: [
      "Dashboard and storefront in EN, ES, and AR",
      "Revenue and order charts",
      "Buyer messages and support chat",
      "First month free, no card required",
    ],
  },
];

const accentClasses: Record<
  Group["accent"],
  { icon: string; ring: string; glow: string }
> = {
  violet: {
    icon: "bg-violet/15 text-violet",
    ring: "hover:border-violet/40",
    glow: "bg-violet/25",
  },
  teal: {
    icon: "bg-teal/15 text-teal",
    ring: "hover:border-teal/40",
    glow: "bg-teal/25",
  },
  pink: {
    icon: "bg-pink/15 text-pink",
    ring: "hover:border-pink/40",
    glow: "bg-pink/25",
  },
};

export function PricingIncluded() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="included" className="relative overflow-hidden bg-paper-dim">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-0 h-72 w-72 rounded-full bg-teal/15 blur-[130px]"
        style={{ animation: "drift-b 24s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            Included on both plans
          </span>
          <h2 className="mt-3 font-display text-[1.9rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">
            The price changes. The product doesn&apos;t.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            Monthly and yearly unlock the exact same shop &mdash; every tool
            below ships from day one, on either rhythm.
          </p>
        </div>

        <div
          ref={ref}
          className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3"
        >
          {groups.map((group, gi) => {
            const accent = accentClasses[group.accent];
            return (
              <div
                key={group.title}
                data-visible={visible}
                className="reveal"
                style={{ transitionDelay: `${gi * 110}ms` }}
              >
                <div
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-surface p-6 shadow-[0_24px_50px_-36px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_60px_-30px_rgba(0,0,0,0.95)]",
                    accent.ring,
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 top-0 h-[3px] bg-[image:var(--gradient-awning)] opacity-70",
                    )}
                  />
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-60",
                      accent.glow,
                    )}
                  />

                  <span
                    className={cn(
                      "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                      accent.icon,
                    )}
                  >
                    <group.icon size={19} strokeWidth={2.1} />
                  </span>

                  <h3 className="relative mt-4 font-display text-lg font-semibold text-ink">
                    {group.title}
                  </h3>
                  <p className="relative mt-1 text-sm text-ink-faint">
                    {group.blurb}
                  </p>

                  <ul className="relative mt-5 flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                          <Check size={10} strokeWidth={3} />
                        </span>
                        <span className="text-sm leading-snug text-ink-soft">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
