import { Check } from "lucide-react";
import { Container } from "../Container";
import { RouteDivider } from "../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";

const included = [
  "Unlimited products, no catalog limit",
  "Mobile-optimized storefront",
  "One shareable link, no domain needed",
  "Order dashboard with buyer details",
  "UPI and cash-on-delivery payments",
  "No payment gateway setup required",
  "Instagram & WhatsApp sharing built in",
  "Free to start, no card required",
];

export function WhatsIncluded() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="whats-included" className="relative bg-paper-dim">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            What&apos;s included
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Everything included. Nothing extra to buy.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            No plugins, no add-on fees, no separate checkout tool. It all comes
            with your store from day one.
          </p>
        </div>

        <div
          ref={ref}
          className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2 lg:mt-16 lg:gap-4"
        >
          {included.map((item, i) => (
            <div
              key={item}
              data-visible={visible}
              className="reveal flex items-start gap-3 rounded-2xl border border-ink/10 bg-ink/[0.04] px-4 py-3.5 transition-colors duration-300 hover:border-violet/40 sm:px-5 sm:py-4"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-ink">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="text-sm leading-relaxed text-ink/85 sm:text-base">
                {item}
              </span>
            </div>
          ))}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
