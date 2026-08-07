import { MessageSquareText, Notebook, Repeat2 } from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";

const noticed = [
  {
    icon: MessageSquareText,
    text: "The same “how much?” and “do you have this in stock?” questions, answered one DM at a time.",
  },
  {
    icon: Notebook,
    text: "Orders tracked across screenshots, notebooks, and half-remembered chat threads.",
  },
  {
    icon: Repeat2,
    text: "Product photos re-sent on repeat because there was nowhere for customers to browse on their own.",
  },
];

export function OurMission() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="our-mission" className="relative bg-paper-dim">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-24">
        <div
          ref={ref}
          data-visible={visible}
          className="reveal-left flex flex-col gap-5"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            Our mission
          </span>
          <h2 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            We didn&apos;t invent selling on social. We just gave it a proper
            storefront.
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
            Long before there was a name for it, sellers were running real
            businesses out of their Instagram grid and WhatsApp status. Stallio
            exists to take that hustle seriously — to give it a storefront, an
            order dashboard, and a link that works as hard as the seller behind
            it.
          </p>
          <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
            No domain to buy, no payment gateway to configure, no code to write.
            Just a store that&apos;s live in minutes and built for the phone
            your customers are already shopping on.
          </p>
        </div>

        <div
          data-visible={visible}
          className="reveal-right relative"
          style={{ transitionDelay: "120ms" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-pink/20 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface/60 p-6 sm:p-8">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-faint">
              What we kept noticing
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              {noticed.map((item) => (
                <li key={item.text} className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet/15 text-teal">
                    <item.icon size={18} strokeWidth={2} />
                  </span>
                  <span className="text-sm leading-relaxed text-ink/85 sm:text-[0.95rem]">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
