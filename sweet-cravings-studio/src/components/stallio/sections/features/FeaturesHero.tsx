import {
  Sparkles,
  ArrowRight,
  Store,
  ClipboardList,
  Package,
  BadgePercent,
  FileText,
  Check,
} from "lucide-react";
import { Container } from "../../Container";
import { CTAButton } from "../../CTAButton";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const checklist = [
  "stallio.shop link, no domain purchase",
  "Unlimited products, photos, and orders",
  "PDF invoices and order export",
  "Coupons, delivery fees, and COD at checkout",
];

const loopSteps = [
  {
    icon: ClipboardList,
    title: "Orders with payment and delivery status",
    accent: "violet" as const,
  },
  {
    icon: Package,
    title: "Products with variants, sales, and stock",
    accent: "teal" as const,
  },
  {
    icon: BadgePercent,
    title: "Coupons and delivery at checkout",
    accent: "pink" as const,
  },
  {
    icon: FileText,
    title: "PDF invoice ready to send",
    accent: "lime" as const,
  },
];

const accentClasses: Record<
  "violet" | "teal" | "pink" | "lime",
  { icon: string; text: string; ring: string }
> = {
  violet: { icon: "bg-violet/15", text: "text-violet", ring: "ring-violet/30" },
  teal: { icon: "bg-teal/15", text: "text-teal", ring: "ring-teal/30" },
  pink: { icon: "bg-pink/15", text: "text-pink", ring: "ring-pink/30" },
  lime: { icon: "bg-lime/15", text: "text-lime", ring: "ring-lime/30" },
};

export function FeaturesHero() {
  const { ref, visible } = useReveal<HTMLDivElement>();

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
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div ref={ref} data-visible={visible} className="reveal-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-dim px-4 py-1.5">
              <Sparkles size={14} className="text-lime" strokeWidth={2.5} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
                Features
              </span>
            </div>

            <h1 className="mt-6 font-display text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.3rem]">
              Everything you need{" "}
              <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
                to sell from one link.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Storefront, dashboard, and seller tools in one place: hosted link,
              unlimited catalog and orders, no buyer payment gateway required.
            </p>

            <ul className="mt-7 flex flex-col gap-2.5">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-snug text-ink-soft sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
              <CTAButton href="/#final-cta" size="lg">
                Start Free
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </CTAButton>
              <CTAButton href="#walkthrough" variant="outline" size="lg">
                See How It Works
              </CTAButton>
            </div>
          </div>

          <div
            data-visible={visible}
            className="reveal-right relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="relative rounded-[1.75rem] border border-ink/10 bg-surface p-5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.35)] sm:p-6">
              <div className="flex items-start gap-3 border-b border-ink/10 pb-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--gradient-brand)] text-white">
                  <Store size={20} strokeWidth={2.2} />
                </span>
                <p className="pt-1 font-display text-[15px] font-semibold leading-snug text-ink sm:text-base">
                  Catalog, checkout, orders, and invoices in one dashboard loop.
                </p>
              </div>

              <ol className="relative mt-5 flex flex-col gap-4">
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-2 bottom-2 w-px bg-ink/10"
                />
                {loopSteps.map((step, i) => (
                  <li
                    key={step.title}
                    className="reveal relative flex items-center gap-3.5"
                    data-visible={visible}
                    style={{ transitionDelay: `${200 + i * 130}ms` }}
                  >
                    <span
                      className={cn(
                        "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-bold ring-1",
                        accentClasses[step.accent].ring,
                        accentClasses[step.accent].text,
                      )}
                    >
                      {/* Opaque backdrop first, so the vertical connector behind never shows through the tint */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0 rounded-full",
                          accentClasses[step.accent].icon,
                        )}
                      />
                      <span className="relative">{i + 1}</span>
                    </span>
                    <span className="flex flex-1 items-center gap-2.5 rounded-xl border border-ink/10 bg-paper-dim px-3.5 py-3">
                      <step.icon
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 text-ink-soft"
                      />
                      <span className="text-xs font-medium leading-snug text-ink sm:text-sm">
                        {step.title}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
