import { Sparkles, Star } from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";

export function AboutHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet/25 blur-[120px]"
      />

      <Container className="relative py-14 text-center sm:py-20 lg:py-24">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-dim px-4 py-1.5">
          <Sparkles size={14} className="text-lime" strokeWidth={2.5} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
            About Stallio
          </span>
        </div>

        <h1 className="mx-auto mt-6 max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Every seller deserves a{" "}
          <span className="bg-[image:var(--gradient-warm)] bg-clip-text text-transparent">
            real storefront
          </span>{" "}
          — not just a comment thread.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Stallio started with a simple observation: thousands of sellers
          already have an audience on Instagram and WhatsApp. What they
          didn&apos;t have was a real place to sell from. So we built one.
        </p>

        <dl className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-ink/10 pt-7">
          <div>
            <dt className="sr-only">Setup time</dt>
            <dd className="font-display text-xl font-semibold text-ink">
              3 min
              <span className="ml-1.5 text-sm font-normal text-ink-soft">
                to launch
              </span>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Domains required</dt>
            <dd className="font-display text-xl font-semibold text-ink">
              0
              <span className="ml-1.5 text-sm font-normal text-ink-soft">
                domains needed
              </span>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Average rating</dt>
            <dd className="flex items-center gap-1 font-display text-xl font-semibold text-ink">
              4.9
              <span className="flex items-center text-amber" aria-hidden="true">
                <Star size={15} fill="currentColor" strokeWidth={0} />
              </span>
              <span className="text-sm font-normal text-ink-soft">
                seller rating
              </span>
            </dd>
          </div>
        </dl>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
