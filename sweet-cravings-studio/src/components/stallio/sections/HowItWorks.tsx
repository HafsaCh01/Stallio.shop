import { Store, ImagePlus, Share2, type LucideIcon } from "lucide-react";
import { Container } from "../Container";
import { RouteDivider } from "../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    icon: Store,
    title: "Create your store",
    description:
      "Pick a store name and add your profile: your logo, a short bio, and the link handle customers will remember.",
  },
  {
    number: "02",
    icon: ImagePlus,
    title: "Add your products",
    description:
      "Upload photos, set prices, and organize items into categories. Edit anything anytime, and the storefront updates instantly.",
  },
  {
    number: "03",
    icon: Share2,
    title: "Share your link",
    description:
      "Drop it in your Instagram bio or WhatsApp status. Customers browse, order, and pay, with no extra app for them to install.",
  },
];

export function HowItWorks() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-paper-dim">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-[-6%] h-80 w-80 rounded-full bg-violet/15 blur-[130px]"
        style={{ animation: "drift-a 24s ease-in-out infinite" }}
      />
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            How it works
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Three steps between you and your first order
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            No developer, no design tool, no waiting on approval. Most sellers
            go from signing up to sharing their link in one sitting.
          </p>
        </div>

        <div ref={ref} className="relative mt-12 lg:mt-16">
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px lg:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--ink) 0 6px, transparent 6px 14px)",
              opacity: 0.15,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-8 top-8 w-px lg:hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, var(--ink) 0 6px, transparent 6px 14px)",
              opacity: 0.15,
            }}
          />

          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                data-visible={visible}
                className="reveal"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <StepCard step={step} />
              </div>
            ))}
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function StepCard({ step }: { step: Step }) {
  const { number, icon: Icon, title, description } = step;

  return (
    <div className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
      <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-surface text-lime transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[image:var(--gradient-brand)] group-hover:text-ink">
        <Icon size={26} strokeWidth={2} />
      </span>
      <div className="pt-1 lg:pt-0">
        <span className="font-display text-xs font-semibold tracking-wider text-ink-faint lg:mt-4 lg:block">
          STEP {number}
        </span>
        <h3 className="mt-1 font-display text-lg font-semibold text-ink">
          {title}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft lg:mx-auto lg:max-w-xs">
          {description}
        </p>
      </div>
    </div>
  );
}
