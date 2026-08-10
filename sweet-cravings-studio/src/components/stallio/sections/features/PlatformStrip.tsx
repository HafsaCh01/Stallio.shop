import { Instagram, Facebook, MessageCircle, Send, AtSign, Globe } from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";

const platforms = [
  { icon: Instagram, label: "Instagram" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Facebook, label: "Facebook" },
  { icon: Send, label: "Telegram" },
  { icon: AtSign, label: "Threads" },
  { icon: Globe, label: "Anywhere you post a link" },
];

export function PlatformStrip() {
  const items = [...platforms, ...platforms];

  return (
    <section id="platforms" className="relative overflow-hidden bg-paper">
      <Container className="py-14 sm:py-16">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint sm:text-xs">
          Works wherever you already sell
        </p>
      </Container>

      <div className="relative overflow-hidden border-y border-ink/10 bg-paper-dim py-6">
        <div
          className="marquee-track flex w-max items-center gap-10"
          style={{ animationDuration: "22s" }}
        >
          {items.map((platform, i) => (
            <span
              key={`${platform.label}-${i}`}
              className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-sm font-medium text-ink-soft transition-colors"
            >
              <platform.icon size={18} strokeWidth={2} className="text-violet" />
              {platform.label}
            </span>
          ))}
        </div>
      </div>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
