import { Quote, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../Container";
import { RouteDivider } from "../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";

const ratings = [5, 5, 5];

type TranslatedTestimonial = { name: string; role: string; quote: string };

export function Testimonials() {
  const { t } = useTranslation("home");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const testimonials = t("testimonials.items", {
    returnObjects: true,
  }) as TranslatedTestimonial[];

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
            {t("testimonials.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {t("testimonials.title")}
          </h2>
        </div>

        <div ref={ref} className="mt-12 grid gap-5 sm:grid-cols-3 lg:mt-16">
          {testimonials.map((item, i) => (
            <blockquote
              key={item.name}
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
                {item.quote}
              </p>
              <div className="mt-5 flex items-center gap-0.5 text-amber" aria-hidden="true">
                {Array.from({ length: ratings[i] ?? 5 }).map((_, s) => (
                  <Star key={s} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <footer className="mt-4 flex min-w-0 items-center gap-3 border-t border-ink/10 pt-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-sm font-semibold text-white">
                  {item.name.charAt(0)}
                </span>
                <span className="min-w-0 text-sm text-ink-soft">
                  <span className="block font-semibold text-ink">{item.name}</span>
                  <span className="block text-xs leading-snug">{item.role}</span>
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
