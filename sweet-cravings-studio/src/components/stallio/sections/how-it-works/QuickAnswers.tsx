import { useState } from "react";
import {
  Globe,
  Pencil,
  Palette,
  Wallet,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type QA = {
  icon: LucideIcon;
  question: string;
  answer: string;
};

const qas: QA[] = [
  {
    icon: Globe,
    question: "Do I need a domain?",
    answer:
      "No. Your link lives at stallio.shop/you from the moment you sign up.",
  },
  {
    icon: Pencil,
    question: "Can I edit after publishing?",
    answer:
      "Anytime. Prices, photos, and stock update on your live link instantly.",
  },
  {
    icon: Palette,
    question: "No logo yet?",
    answer:
      "Start with your store name and colors. Add a logo whenever it's ready.",
  },
  {
    icon: Wallet,
    question: "How do buyers pay?",
    answer:
      "You set the method, bank, link, or COD. Stallio tracks the order for you.",
  },
];

export function QuickAnswers() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="quick-answers"
      className="relative overflow-hidden bg-paper-dim"
    >
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            Before you start
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Quick answers
          </h2>
        </div>

        <div
          ref={ref}
          data-visible={visible}
          className="reveal mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:mt-12"
        >
          {qas.map((qa, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={qa.question}
                data-visible={visible}
                className={cn(
                  "reveal overflow-hidden rounded-2xl border bg-surface transition-colors duration-300",
                  isOpen ? "border-teal/40" : "border-ink/10",
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3.5 p-4 text-left sm:gap-4 sm:p-5"
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                      isOpen ? "bg-teal text-white" : "bg-teal/15 text-teal",
                    )}
                  >
                    <qa.icon size={16} strokeWidth={2.1} />
                  </span>
                  <span className="flex-1 font-display text-sm font-semibold text-ink sm:text-base">
                    {qa.question}
                  </span>
                  <Plus
                    size={16}
                    className={cn(
                      "shrink-0 text-ink-faint transition-transform duration-300",
                      isOpen && "rotate-45 text-teal",
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 pl-[3.75rem] text-xs leading-relaxed text-ink-soft sm:px-5 sm:pb-5 sm:pl-[4.25rem] sm:text-sm">
                      {qa.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
