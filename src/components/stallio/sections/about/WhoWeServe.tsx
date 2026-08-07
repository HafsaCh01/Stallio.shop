import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { sellerCategories } from "@/lib/constants";

export function WhoWeServe() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="who-we-serve" className="relative bg-paper-dim">
      <Container className="py-16 text-center sm:py-20 lg:py-24">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
          Who we build for
        </span>
        <h2 className="mx-auto mt-3 max-w-2xl font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Small sellers, real businesses
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-lg">
          If your customers already find you through a post or a chat, Stallio
          was built with you in mind.
        </p>

        <div
          ref={ref}
          data-visible={visible}
          className="reveal mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 lg:mt-12"
        >
          {sellerCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-ink/12 bg-surface/60 px-4 py-2 text-sm font-medium text-ink-soft transition-colors duration-300 hover:border-violet/40 hover:text-ink"
            >
              {category}
            </span>
          ))}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
