import { Check, X } from "lucide-react";
import { Container } from "../Container";
import { CTAButton } from "../CTAButton";
import { RouteDivider } from "../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";

const chatOnly = [
  "Copy-pasting prices into every single DM",
  "Orders scattered across chats",
  "No single place for prices & photos",
  "Re-sending the same product photos on repeat",
  "Customers ask the same questions on repeat",
  "Chasing screenshots as proof of payment",
  "Payments and delivery feel improvised",
];

const withStallio = [
  "One link customers browse and order from directly",
  "One link: catalog + cart",
  "Clear product pages you can share anywhere",
  "A live product grid that updates the moment you edit it",
  "Fewer “how much?” messages",
  "UPI and cash-on-delivery built into checkout",
  "A storefront that looks intentional",
];

export function Comparison() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);

  return (
    <section id="compare" className="relative overflow-hidden bg-paper">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            Before &amp; after
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Same hustle. Completely different storefront.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            Most sellers start out running their shop through screenshots and
            comment threads. Stallio just gives that hustle a proper storefront.
          </p>
        </div>

        <div
          ref={ref}
          className="relative mx-auto mt-12 grid max-w-5xl gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-8 lg:[perspective:1400px]"
        >
          <ComparePanel
            tone="bad"
            title="Chat-only selling"
            items={chatOnly}
            visible={visible}
          />
          <ComparePanel
            tone="good"
            title="With Stallio"
            items={withStallio}
            visible={visible}
          />

          <span
            data-visible={visible}
            className="reveal absolute left-1/2 top-1/2 z-20 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-ink/10 bg-surface text-xs font-bold uppercase tracking-widest text-ink shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] lg:flex"
            style={{ transitionDelay: "420ms" }}
          >
            vs
          </span>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <CTAButton href="#final-cta" size="md">
            Try Stallio free
          </CTAButton>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function ComparePanel({
  tone,
  title,
  items,
  visible,
}: {
  tone: "bad" | "good";
  title: string;
  items: string[];
  visible: boolean;
}) {
  const good = tone === "good";
  const Icon = good ? Check : X;

  return (
    <div
      data-visible={visible}
      className={[
        good ? "reveal-right" : "reveal-left",
        "relative overflow-hidden rounded-[1.75rem] border p-6 transition-transform duration-500 sm:p-8 lg:hover:-translate-y-1.5",
        good
          ? "border-violet/40 bg-violet/[0.07] shadow-[0_30px_70px_-40px_var(--violet)]"
          : "border-coral/25 bg-coral/[0.05]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl",
          good ? "bg-violet/30" : "bg-coral/20",
        ].join(" ")}
      />

      <div className="relative flex items-center gap-3">
        <span
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
            good ? "bg-violet/20 text-teal" : "bg-coral/15 text-coral",
          ].join(" ")}
        >
          <Icon size={20} strokeWidth={3} />
        </span>
        <h3 className="truncate font-display text-xl font-semibold text-ink sm:text-2xl">
          {title}
        </h3>
      </div>

      <ul className="relative mt-6 flex flex-col gap-3.5 sm:gap-4">
        {items.map((item, i) => (
          <li
            key={item}
            data-visible={visible}
            className="reveal flex items-start gap-3"
            style={{ transitionDelay: `${250 + i * 80}ms` }}
          >
            <span
              className={[
                "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                good ? "bg-teal" : "bg-coral",
              ].join(" ")}
            />
            <span
              className={[
                "text-sm leading-relaxed sm:text-base",
                good ? "font-medium text-ink" : "text-ink-soft",
              ].join(" ")}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>

      <span className="relative mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-faint lg:hidden">
        {good ? "After" : "Before"}
      </span>
    </div>
  );
}
