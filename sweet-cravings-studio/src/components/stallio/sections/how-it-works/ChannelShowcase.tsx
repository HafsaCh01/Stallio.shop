import {
  Instagram,
  Facebook,
  MessageCircle,
  Link2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Channel = {
  icon: LucideIcon;
  name: string;
  placement: string;
  accent: "pink" | "teal" | "lime" | "violet";
};

const channels: Channel[] = [
  {
    icon: Instagram,
    name: "Instagram bio",
    placement: "One tap from your profile",
    accent: "pink",
  },
  {
    icon: MessageCircle,
    name: "WhatsApp status",
    placement: "Pinned above the fold",
    accent: "lime",
  },
  {
    icon: Facebook,
    name: "Facebook page",
    placement: "Shop button, sorted",
    accent: "teal",
  },
  {
    icon: Link2,
    name: "Anywhere else",
    placement: "Group chats, stories, ads",
    accent: "violet",
  },
];

const accentMap = {
  pink: { ring: "ring-pink/30 bg-pink/15 text-pink", glow: "bg-pink/20" },
  teal: { ring: "ring-teal/30 bg-teal/15 text-teal", glow: "bg-teal/20" },
  lime: { ring: "ring-lime/30 bg-lime/15 text-lime", glow: "bg-lime/20" },
  violet: {
    ring: "ring-violet/30 bg-violet/15 text-violet",
    glow: "bg-violet/20",
  },
} as const;

export function ChannelShowcase() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="channels" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-violet/10 blur-[150px]"
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-pink sm:text-xs">
            One link, everywhere
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            You already have buyers here.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            Stallio doesn't ask people to go somewhere new. It just gives the
            channels they already use one link that actually sells.
          </p>
        </div>

        <div
          ref={ref}
          data-visible={visible}
          className="reveal mt-12 grid grid-cols-2 gap-4 sm:mt-14 lg:grid-cols-4 lg:gap-5"
        >
          {channels.map((channel, i) => {
            const a = accentMap[channel.accent];
            return (
              <div
                key={channel.name}
                data-visible={visible}
                className="reveal group relative overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-xl sm:p-6"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100",
                    a.glow,
                  )}
                />
                <span
                  className={cn(
                    "relative flex h-11 w-11 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:-rotate-6 sm:h-12 sm:w-12",
                    a.ring,
                  )}
                >
                  <channel.icon size={19} strokeWidth={2} />
                </span>
                <h3 className="relative mt-4 font-display text-sm font-semibold text-ink sm:text-base">
                  {channel.name}
                </h3>
                <p className="relative mt-1 text-xs leading-relaxed text-ink-soft sm:text-sm">
                  {channel.placement}
                </p>
              </div>
            );
          })}
        </div>

        <div
          data-visible={visible}
          className="reveal mx-auto mt-8 flex max-w-md items-center justify-center gap-2.5 rounded-full border border-ink/10 bg-paper-dim px-5 py-3 text-center sm:mt-10"
          style={{ transitionDelay: "380ms" }}
        >
          <Link2 size={14} className="shrink-0 text-violet" />
          <span className="truncate font-display text-xs font-semibold text-ink sm:text-sm">
            stallio.shop/you
          </span>
          <span className="hidden text-xs text-ink-faint sm:inline">
            — same link, every single time
          </span>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
