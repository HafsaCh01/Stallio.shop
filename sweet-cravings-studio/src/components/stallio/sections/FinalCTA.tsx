import { ArrowRight, Link2, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "../Container";
import { CTAButton } from "../CTAButton";
import { useReveal } from "@/hooks/use-reveal";

const perks = [
  { icon: Sparkles, label: "Free to start" },
  { icon: Link2, label: "No domain needed" },
  { icon: ShieldCheck, label: "No card required" },
];

export function FinalCTA() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="final-cta" className="relative overflow-hidden bg-paper">
      <Container className="py-16 sm:py-20 lg:py-28">
        <div
          ref={ref}
          data-visible={visible}
          className="reveal relative overflow-hidden rounded-[2rem] border border-violet/30 bg-paper-dim px-6 py-12 text-center sm:px-10 sm:py-16 lg:px-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet/30 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-pink/25 blur-[100px]"
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
              Ready when you are
            </span>

            <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              Give your hustle a{" "}
              <span className="bg-[image:var(--gradient-warm)] bg-clip-text text-transparent">
                real storefront
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-lg">
              Set up your shop in a few minutes, share one link, and let
              customers browse and order without a single &ldquo;how
              much?&rdquo; message.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <CTAButton href="#top" size="lg">
                Create your store
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </CTAButton>
              <CTAButton href="#how-it-works" variant="outline" size="lg">
                See how it works
              </CTAButton>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-ink-soft sm:text-sm">
              {perks.map((perk) => (
                <li key={perk.label} className="flex items-center gap-2">
                  <perk.icon size={15} className="shrink-0 text-teal" />
                  {perk.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
