import { useState } from "react";
import { Plus } from "lucide-react";
import { Container } from "../../Container";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Do I need a website or domain to use Stallio?",
    answer:
      "No. Your storefront lives on a Stallio link from the moment you sign up. There's no domain to buy or DNS to configure.",
  },
  {
    question: "Is there a limit on how many products I can list?",
    answer:
      "No catalog cap. Whether you sell one product or a thousand, every listing gets its own page in your storefront.",
  },
  {
    question: "What payment methods can customers use?",
    answer:
      "UPI and cash-on-delivery are built in from day one. Neither requires a payment gateway application or approval wait.",
  },
  {
    question: "Can customers check out without creating an account?",
    answer:
      "Yes. Buyers can browse, add to cart, and check out as guests. Nothing to sign up for on their end.",
  },
  {
    question: "Can I switch between light and dark mode?",
    answer:
      "Your storefront supports both, and visitors can toggle whichever they prefer while browsing.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes, Stallio is free to start with no card required. You can open a store and add products before paying anything.",
  },
];

export function FeatureFAQ() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-paper-dim">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            Questions
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Feature questions, answered
          </h2>
        </div>

        <div ref={ref} className="mx-auto mt-12 max-w-2xl divide-y divide-ink/10 lg:mt-14">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div
                key={faq.question}
                data-visible={visible}
                className="reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-sm font-semibold text-ink sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet/15 text-violet transition-transform duration-300",
                      open && "rotate-45 bg-[image:var(--gradient-brand)] text-ink",
                    )}
                  >
                    <Plus size={14} strokeWidth={2.5} />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-300 ease-in-out",
                    open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <p className="min-h-0 text-sm leading-relaxed text-ink-soft sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
