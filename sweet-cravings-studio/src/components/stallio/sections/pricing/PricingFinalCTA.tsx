import { Mail, Store } from "lucide-react";
import { Container } from "../../Container";
import { CTAButton } from "../../CTAButton";
import { useReveal } from "@/hooks/use-reveal";

export function PricingFinalCTA() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="final-cta" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[150px]"
        style={{ animation: "drift-c 24s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div
          ref={ref}
          data-visible={visible}
          className="reveal mx-auto max-w-xl text-center"
        >
          <h2 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Still deciding?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            Ask us anything on the contact page, or start a trial and see the
            product for yourself.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            <CTAButton href="/#contact" variant="outline" size="lg">
              <Mail size={17} />
              Contact Us
            </CTAButton>
            <CTAButton href="/signup" size="lg">
              <Store size={17} />
              Start Free
            </CTAButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
