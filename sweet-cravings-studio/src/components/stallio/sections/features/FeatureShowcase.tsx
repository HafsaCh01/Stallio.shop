import { useState } from "react";
import {
  LayoutGrid,
  Wallet,
  BarChart3,
  MessageSquare,
  Check,
  Clock,
  Star,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";

type TabKey = "storefront" | "checkout" | "dashboard" | "chat";

type Tab = {
  key: TabKey;
  label: string;
  icon: LucideIcon;
  heading: string;
  description: string;
  points: string[];
};

const tabs: Tab[] = [
  {
    key: "storefront",
    label: "Storefront",
    icon: LayoutGrid,
    heading: "A catalog that looks like a real shop",
    description:
      "Every product gets its own page with photos, price, and variants, laid out in a grid your buyers can actually browse.",
    points: [
      "Unlimited product listings",
      "Mobile-first layout, every screen size",
      "Light & dark mode built in",
      "Custom store name, bio, and logo",
    ],
  },
  {
    key: "checkout",
    label: "Checkout",
    icon: Wallet,
    heading: "Cart to confirmed order, no gateway needed",
    description:
      "Buyers add items, pick a payment method, and check out without leaving the chat app they found you on.",
    points: [
      "One cart across your whole catalog",
      "UPI and cash-on-delivery, ready by default",
      "No payment gateway approval to wait on",
      "Guest checkout, zero signup for buyers",
    ],
  },
  {
    key: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    heading: "Every order in one place, not six chats",
    description:
      "Track each order from placed to delivered, with buyer details attached instead of buried in your DMs.",
    points: [
      "Live status: pending, confirmed, shipped",
      "Buyer name, contact, and order value together",
      "Searchable order history",
      "Updates the instant a buyer checks out",
    ],
  },
  {
    key: "chat",
    label: "Chat & trust",
    icon: MessageSquare,
    heading: "Keep the DM-style relationship buyers like",
    description:
      "A tap-to-chat button and visible reviews keep the personal touch that made people trust your page in the first place.",
    points: [
      "Tap-to-chat button on every product",
      "Direct handoff to WhatsApp",
      "Star ratings and reviews on your store",
      "Repeat buyers recognized automatically",
    ],
  },
];

export function FeatureShowcase() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState<TabKey>("storefront");
  const tab = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <section id="showcase" className="relative overflow-hidden bg-paper-dim">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] top-[10%] h-96 w-96 rounded-full bg-violet/15 blur-[150px]"
        style={{ animation: "drift-b 26s ease-in-out infinite" }}
      />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            See it in action
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            One storefront, four things working together
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            Tap through to see what buyers and sellers each get, without
            switching apps.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Feature showcase"
          className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2 sm:mt-12"
        >
          {tabs.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.key)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "border-transparent bg-[image:var(--gradient-brand)] text-ink shadow-lg shadow-violet/25"
                    : "border-ink/12 bg-surface text-ink-soft hover:border-teal/50 hover:text-ink",
                )}
              >
                <t.icon size={16} strokeWidth={2.25} />
                {t.label}
              </button>
            );
          })}
        </div>

        <div
          ref={ref}
          data-visible={visible}
          className="reveal mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14"
        >
          <div key={tab.key} style={{ animation: "pop-in-item 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}>
            <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {tab.heading}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
              {tab.description}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {tab.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-ink sm:text-base">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <ShowcaseMockup active={active} />
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function ShowcaseMockup({ active }: { active: TabKey }) {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-pink/20 blur-3xl" />
      <div className="absolute -bottom-8 -left-6 h-44 w-44 rounded-full bg-teal/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1.5 border-b border-ink/8 bg-paper-dim px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-coral/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-teal/60" />
          <span className="ml-3 truncate rounded-full bg-surface px-3 py-1 text-[10px] text-ink-faint">
            stallio.shop/your-store
          </span>
        </div>

        <div className="min-h-[280px] p-4 sm:p-5" key={active} style={{ animation: "pop-in 0.4s ease-out both" }}>
          {active === "storefront" && <StorefrontPanel />}
          {active === "checkout" && <CheckoutPanel />}
          {active === "dashboard" && <DashboardPanel />}
          {active === "chat" && <ChatPanel />}
        </div>
      </div>
    </div>
  );
}

const showcaseProducts = [
  { name: "Chunky Sneakers", price: "Rs 999", img: prod1 },
  { name: "Everyday Runners", price: "Rs 1,249", img: prod2 },
  { name: "Retro High-Tops", price: "Rs 1,499", img: prod3 },
  { name: "Court Classics", price: "Rs 1,749", img: prod4 },
];

function StorefrontPanel() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {showcaseProducts.map((p, i) => (
        <div
          key={p.name}
          className="overflow-hidden rounded-xl border border-ink/8 bg-paper-dim"
          style={{ animation: "pop-in-item 0.4s ease-out both", animationDelay: `${i * 70}ms` }}
        >
          <div className="h-20 w-full overflow-hidden">
            <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="p-2">
            <p className="truncate text-[11px] font-semibold text-ink">{p.name}</p>
            <p className="text-[10px] text-ink-faint">{p.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CheckoutPanel() {
  return (
    <div className="flex flex-col gap-3">
      {showcaseProducts.slice(0, 2).map((p) => (
        <div key={p.name} className="flex items-center gap-3 rounded-xl border border-ink/8 bg-paper-dim p-2.5">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
            <img src={p.img} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-ink">{p.name}</p>
            <p className="text-[10px] text-ink-faint">{p.price}</p>
          </div>
          <span className="text-[10px] font-semibold text-ink-soft">x1</span>
        </div>
      ))}
      <div className="mt-1 rounded-xl border border-teal/30 bg-teal/10 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-teal">Payment method</p>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-surface px-3 py-1 text-[10px] font-semibold text-ink shadow-sm">UPI</span>
          <span className="rounded-full border border-ink/15 px-3 py-1 text-[10px] font-medium text-ink-soft">Cash on delivery</span>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-ink px-3 py-2.5 text-white">
        <span className="text-[11px] font-medium">Total: Rs 2,248</span>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-lime">
          <Truck size={12} /> Confirm order
        </span>
      </div>
    </div>
  );
}

const dashboardOrders = [
  { id: "#1042", buyer: "Ayesha K.", status: "pending" as const },
  { id: "#1041", buyer: "Bilal R.", status: "confirmed" as const },
  { id: "#1039", buyer: "Sana M.", status: "confirmed" as const },
  { id: "#1037", buyer: "Hamza T.", status: "pending" as const },
];

function DashboardPanel() {
  return (
    <div className="flex flex-col gap-2">
      {dashboardOrders.map((order, i) => (
        <div
          key={order.id}
          className="flex items-center justify-between gap-2 rounded-xl border border-ink/8 bg-paper-dim px-3 py-2.5"
          style={{ animation: "pop-in-item 0.4s ease-out both", animationDelay: `${i * 70}ms` }}
        >
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-ink">
              {order.id} &bull; {order.buyer}
            </p>
            <p className="text-[10px] text-ink-faint">
              {order.status === "pending" ? "Awaiting confirmation" : "Confirmed"}
            </p>
          </div>
          <span
            className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
              order.status === "pending" ? "bg-amber/20 text-amber" : "bg-teal/20 text-teal",
            )}
          >
            {order.status === "pending" ? <Clock size={12} strokeWidth={2.5} /> : <Check size={12} strokeWidth={2.5} />}
          </span>
        </div>
      ))}
    </div>
  );
}

function ChatPanel() {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-ink/8 bg-paper-dim p-3">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-ink">Zainab</p>
          <span className="flex items-center gap-0.5 text-amber">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} size={9} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
        </div>
        <p className="mt-1 text-[10px] leading-relaxed text-ink-soft">
          Ordered straight from the WhatsApp link, so easy.
        </p>
      </div>
      <div className="rounded-xl border border-ink/8 bg-paper-dim p-3">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-ink">Hamza</p>
          <span className="flex items-center gap-0.5 text-amber">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} size={9} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
        </div>
        <p className="mt-1 text-[10px] leading-relaxed text-ink-soft">
          Loved seeing order status without asking in DMs.
        </p>
      </div>
      <div className="flex items-center justify-between gap-2 rounded-xl bg-[image:var(--gradient-brand)] px-3 py-2.5">
        <span className="text-[11px] font-semibold text-ink">Chat with seller</span>
        <MessageSquare size={14} className="text-ink" strokeWidth={2.5} />
      </div>
    </div>
  );
}
