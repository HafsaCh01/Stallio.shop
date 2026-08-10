import { Quote, Star } from "lucide-react";
import { Container } from "../Container";
import { RouteDivider } from "../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";

const testimonials = [
  {
    name: "Ayesha",
    role: "Thrift reseller, Lahore",
    quote:
      "I stopped answering \u201chow much?\u201d fifty times a day. People just open the link and order.",
    rating: 5,
  },
  {
    name: "Bilal",
    role: "Home baker, Karachi",
    quote:
      "Orders finally live in one dashboard instead of six chats and a notebook.",
    rating: 5,
  },
  {
    name: "Zainab",
    role: "Skincare brand, Islamabad",
    quote:
      "My storefront looks like a real shop now, not just a grid of product photos.",
    rating: 5,
  },
];

export function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="testimonials" className="relative overflow-hidden bg-paper-dim">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-violet/15 blur-[120px]"
        style={{ animation: "drift-a 25s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-pink/15 blur-[120px]"
      />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            Sellers on Stallio
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            What they say once they switch
          </h2>
        </div>

        <div
          ref={ref}
          className="mt-12 grid gap-5 sm:grid-cols-3 lg:mt-16"
        >
          {testimonials.map((t, i) => (
            <blockquote
              key={t.name}
              data-visible={visible}
              className="reveal group relative flex flex-col rounded-3xl border border-ink/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/40 sm:p-7"
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <Quote
                size={28}
                strokeWidth={2}
                className="text-violet/30 transition-colors duration-300 group-hover:text-violet/60"
                aria-hidden="true"
              />
              <p className="mt-4 flex-1 font-display text-base leading-relaxed text-ink sm:text-lg">
                {t.quote}
              </p>
              <div className="mt-5 flex items-center gap-0.5 text-amber" aria-hidden="true">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <footer className="mt-4 flex min-w-0 items-center gap-3 border-t border-ink/10 pt-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-sm font-semibold text-white">
                  {t.name.charAt(0)}
                </span>
                <span className="min-w-0 truncate text-sm text-ink-soft">
                  <span className="font-semibold text-ink">{t.name}</span>
                  <span className="block truncate text-xs">{t.role}</span>
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
