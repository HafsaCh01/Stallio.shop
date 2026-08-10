import { ArrowRight, Target, Zap, Store } from "lucide-react";
import { Container } from "../../Container";
import { CTAButton } from "../../CTAButton";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const stats = [
  { icon: Target, label: "Simple", description: "No code, no theme maze", accent: "text-violet" },
  { icon: Zap, label: "Fast", description: "Draft a store in minutes", accent: "text-amber" },
  { icon: Store, label: "Credible", description: "A link buyers recognize", accent: "text-teal" },
];

export function AboutCTA() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-violet/30 blur-[160px]"
        style={{ animation: "drift-a 24s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-pink/15 blur-[140px]"
        style={{ animation: "drift-b 28s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div ref={ref} data-visible={visible} className="reveal">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[2rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl">
              Ready to look as serious as you are?
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-lg">
              Create a free store, add a few products, and drop your link
              where people already find you.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <CTAButton href="/#final-cta" size="lg">
                Start Free
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </CTAButton>
              <CTAButton
                href="/#contact"
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:border-teal hover:text-teal"
              >
                Contact Us
              </CTAButton>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group flex flex-col items-center gap-2 px-6 py-8 text-center transition-colors duration-300 hover:bg-white/[0.04]"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span
                  className={cn(
                    "transition-transform duration-300 group-hover:scale-110",
                    stat.accent,
                  )}
                >
                  <stat.icon size={26} strokeWidth={2} />
                </span>
                <span className={cn("font-display text-lg font-semibold", stat.accent)}>
                  {stat.label}
                </span>
                <span className="text-sm text-white/60">{stat.description}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
