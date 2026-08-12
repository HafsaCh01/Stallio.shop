import { MessageCircle, Check, Send, Store, PackageCheck } from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const signalSteps = [
  { icon: Send, label: "They DM you", accent: "coral" as const },
  { icon: Store, label: "They tap your link", accent: "violet" as const },
  {
    icon: PackageCheck,
    label: "Order lands in your inbox",
    accent: "teal" as const,
  },
];

const signalAccent: Record<
  (typeof signalSteps)[number]["accent"],
  { icon: string; text: string; ring: string; dot: string }
> = {
  coral: {
    icon: "bg-coral/15",
    text: "text-coral",
    ring: "ring-coral/40",
    dot: "bg-coral",
  },
  violet: {
    icon: "bg-violet/15",
    text: "text-violet",
    ring: "ring-violet/40",
    dot: "bg-violet",
  },
  teal: {
    icon: "bg-teal/15",
    text: "text-teal",
    ring: "ring-teal/40",
    dot: "bg-teal",
  },
};

const friction = [
  "Products are hard to showcase properly",
  "Orders get lost in messages",
  "Customers feel confused",
  "The business does not look professional",
];

const solution = [
  "A hosted mini store at stallio.shop/yourname",
  "Unlimited catalog, checkout, and order inbox",
  "PDF invoices, coupons, and delivery rules included",
  "Sign up, add products, share one link tonight",
];

export function OurMission() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="why-we-exist" className="relative bg-paper-dim">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            Why we exist
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Selling on social should not feel improvised.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            Most small sellers juggle screenshots, voice notes, and scattered
            chats. Stallio gives you a single shelf: catalog, checkout cues, and
            orders in one dashboard.
          </p>
        </div>

        {/* Animated signal path: how a chat turns into an order */}
        <div
          data-visible={visible}
          className="reveal mx-auto mt-12 max-w-3xl rounded-3xl border border-ink/10 bg-surface p-6 shadow-[0_24px_50px_-36px_rgba(0,0,0,0.9)] sm:p-8"
        >
          <div className="relative flex items-start justify-between gap-2 sm:gap-6">
            <span
              aria-hidden="true"
              className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px sm:block"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, var(--ink) 0 5px, transparent 5px 11px)",
                opacity: 0.18,
              }}
            />
            {signalSteps.map((step, i) => {
              const accent = signalAccent[step.accent];
              return (
                <div
                  key={step.label}
                  className="relative flex flex-1 flex-col items-center gap-3 text-center"
                >
                  <span
                    className={cn(
                      "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-paper ring-1",
                      accent.ring,
                    )}
                    style={{
                      animation: visible
                        ? `float-slow 4.5s ease-in-out infinite ${i * 0.4}s`
                        : undefined,
                    }}
                  >
                    {/* Opaque backdrop first, so the dashed connector behind never shows through the tint */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 rounded-2xl",
                        accent.icon,
                      )}
                    />
                    <step.icon
                      size={20}
                      strokeWidth={2}
                      className={cn("relative", accent.text)}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full",
                        accent.dot,
                      )}
                      style={{
                        animation: visible
                          ? `pulse-dot 1.8s ease-in-out infinite ${i * 0.4}s`
                          : undefined,
                      }}
                    />
                  </span>
                  <p className="max-w-[6.5rem] text-xs font-semibold leading-snug text-ink sm:max-w-[8rem] sm:text-sm">
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div
          ref={ref}
          className="relative mx-auto mt-12 grid max-w-5xl gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-8"
        >
          <div
            data-visible={visible}
            className="reveal-left relative overflow-hidden rounded-3xl border border-coral/25 bg-coral/[0.05] p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-coral/15 text-coral">
                <MessageCircle size={20} strokeWidth={2} />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">
                The friction
              </h3>
            </div>
            <p className="mt-5 text-sm text-ink-soft">
              Relying only on messages and posts often means:
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {friction.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral" />
                  <span className="text-sm leading-relaxed text-ink-soft sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <span
            data-visible={visible}
            className="reveal absolute left-1/2 top-1/2 z-20 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-ink/10 bg-surface text-xs font-bold uppercase tracking-widest text-ink shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] lg:flex"
          >
            vs
          </span>

          <div
            data-visible={visible}
            className="reveal-right relative overflow-hidden rounded-3xl border border-violet/40 bg-violet/[0.07] p-6 shadow-[0_30px_70px_-40px_var(--violet)] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet/20 text-violet">
                <Check size={20} strokeWidth={3} />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">
                What Stallio does
              </h3>
            </div>
            <p className="mt-5 text-sm text-ink-soft">You get:</p>
            <ul className="mt-4 flex flex-col gap-3">
              {solution.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet" />
                  <span className="text-sm font-medium leading-relaxed text-ink sm:text-base">
                    {item}
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
