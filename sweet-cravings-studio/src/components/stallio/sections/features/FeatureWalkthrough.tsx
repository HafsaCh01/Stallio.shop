import { useState, type ReactNode } from "react";
import {
  Store,
  Wallet,
  ClipboardList,
  MessageCircle,
  Check,
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

type TabId = "storefront" | "checkout" | "dashboard" | "chat";

type Tab = {
  id: TabId;
  label: string;
  icon: LucideIcon;
  accent: "violet" | "teal" | "pink" | "lime";
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

const tabs: Tab[] = [
  {
    id: "storefront",
    label: "Storefront",
    icon: Store,
    accent: "violet",
    eyebrow: "What buyers see",
    title: "A catalog that reads as a real shop",
    description:
      "Every product gets its own page with photos, price, and variants, laid out in a grid buyers can actually browse on their phone.",
    bullets: [
      "Unlimited products and photos",
      "Mobile-first layout on every screen size",
      "Light and dark mode built in",
      "Custom store name, bio, and logo",
    ],
  },
  {
    id: "checkout",
    label: "Checkout",
    icon: Wallet,
    accent: "pink",
    eyebrow: "What buyers do",
    title: "Cart to confirmed order, no gateway needed",
    description:
      "Buyers add items, pick a payment method, and check out without leaving the link you shared.",
    bullets: [
      "One cart across the whole catalog",
      "UPI and cash on delivery, ready by default",
      "No payment gateway approval to wait on",
      "Guest checkout, zero signup for buyers",
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: ClipboardList,
    accent: "teal",
    eyebrow: "What you run the shop on",
    title: "Every order in one place, not six chats",
    description:
      "Track each order from placed to delivered, with buyer details attached instead of buried in your DMs.",
    bullets: [
      "Live status: pending, confirmed, shipped",
      "Buyer name, contact, and order value together",
      "Searchable order history",
      "Updates the instant a buyer checks out",
    ],
  },
  {
    id: "chat",
    label: "Chat & Trust",
    icon: MessageCircle,
    accent: "lime",
    eyebrow: "What keeps buyers coming back",
    title: "Keep the DM-style relationship buyers already like",
    description:
      "A tap-to-chat button and visible reviews keep the personal touch that made people trust your page in the first place.",
    bullets: [
      "Tap-to-chat button on every product",
      "Direct handoff to WhatsApp",
      "Star ratings and reviews on your store",
      "Repeat buyers recognized automatically",
    ],
  },
];

const accentText = {
  violet: "text-violet",
  teal: "text-teal",
  pink: "text-pink",
  lime: "text-lime",
};

const accentBg = {
  violet: "bg-violet/15 text-violet ring-violet/30",
  teal: "bg-teal/15 text-teal ring-teal/30",
  pink: "bg-pink/15 text-pink ring-pink/30",
  lime: "bg-lime/15 text-lime ring-lime/30",
};

const accentActiveTab = {
  violet: "bg-[image:var(--gradient-brand)] text-white shadow-violet/30",
  teal: "bg-[linear-gradient(90deg,var(--teal),var(--violet))] text-white shadow-teal/30",
  pink: "bg-[image:var(--gradient-brand)] text-white shadow-pink/30",
  lime: "bg-[linear-gradient(90deg,var(--lime),var(--pink))] text-white shadow-lime/30",
};

export function FeatureWalkthrough() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState<TabId>("storefront");
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0]!;

  return (
    <section id="walkthrough" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal/15 blur-[140px]"
        style={{ animation: "drift-a 25s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet sm:text-xs">
            See it in action
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            One storefront, four things working together
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            Tap through to see what buyers and sellers each get, without
            switching apps.
          </p>
        </div>

        {/* Tab switcher */}
        <div
          role="tablist"
          aria-label="Feature walkthrough"
          className="mx-auto mt-9 flex max-w-full flex-wrap items-center justify-center gap-2 sm:mt-11"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-tight transition-all duration-300 sm:text-sm",
                  isActive
                    ? cn(
                        "border-transparent shadow-lg",
                        accentActiveTab[tab.accent],
                      )
                    : "border-ink/12 bg-surface text-ink-soft hover:border-ink/25 hover:text-ink",
                )}
              >
                <tab.icon size={15} strokeWidth={2.3} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          ref={ref}
          data-visible={visible}
          className="reveal mt-10 grid items-center gap-10 sm:mt-12 lg:grid-cols-2 lg:gap-14"
        >
          <div key={activeTab.id} className="animate-fade-up">
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-xs",
                accentText[activeTab.accent],
              )}
            >
              {activeTab.eyebrow}
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl lg:text-[1.9rem]">
              {activeTab.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
              {activeTab.description}
            </p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {activeTab.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                      accentBg[activeTab.accent],
                    )}
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-snug text-ink-soft sm:text-base">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] opacity-40 blur-2xl transition-colors duration-500",
                activeTab.accent === "violet" && "bg-violet/25",
                activeTab.accent === "teal" && "bg-teal/25",
                activeTab.accent === "pink" && "bg-pink/25",
                activeTab.accent === "lime" && "bg-lime/25",
              )}
            />
            <div
              key={`${activeTab.id}-mock`}
              className="animate-fade-up overflow-hidden rounded-[1.5rem] border border-ink/12 bg-surface shadow-[0_40px_90px_-40px_rgba(0,0,0,0.5)] ring-1 ring-ink/5"
            >
              <div className="flex items-center gap-2 border-b border-ink/10 bg-paper-dim px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-pink/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-teal/70" />
                <span className="ml-2 rounded-full bg-surface px-3 py-1 text-[10px] font-medium text-ink-faint ring-1 ring-ink/10">
                  stallio.shop/your-store
                </span>
              </div>
              <div className="p-4 sm:p-5">
                {activeTab.id === "storefront" && <StorefrontMock />}
                {activeTab.id === "checkout" && <CheckoutMock />}
                {activeTab.id === "dashboard" && <DashboardMock />}
                {activeTab.id === "chat" && <ChatMock />}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function MockRow({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-paper-dim px-3.5 py-3 ring-1 ring-ink/5">
      {children}
    </div>
  );
}

function StorefrontMock() {
  const products = [
    { name: "Chunky Sneakers", price: "Rs 999", img: prod1 },
    { name: "Everyday Runners", price: "Rs 1,249", img: prod2 },
    { name: "Retro High-Tops", price: "Rs 1,499", img: prod3 },
    { name: "Court Classics", price: "Rs 1,749", img: prod4 },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((p) => (
        <div
          key={p.name}
          className="group overflow-hidden rounded-xl border border-ink/10 bg-paper-dim"
        >
          <div className="aspect-square overflow-hidden bg-paper">
            <img
              src={p.img}
              alt={p.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-2.5">
            <p className="text-[11px] font-semibold leading-tight text-ink sm:text-xs">
              {p.name}
            </p>
            <p className="text-[10px] text-ink-faint sm:text-[11px]">
              {p.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CheckoutMock() {
  return (
    <div className="flex flex-col gap-3">
      <MockRow>
        <div className="flex items-center gap-3">
          <img
            src={prod1}
            alt=""
            className="h-10 w-10 shrink-0 rounded-lg object-cover"
          />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink sm:text-sm">
                Chunky Sneakers
              </p>
              <p className="text-[11px] text-ink-faint">Rs 999</p>
            </div>
            <span className="text-[11px] font-medium text-ink-soft">x1</span>
          </div>
        </div>
      </MockRow>
      <MockRow>
        <div className="flex items-center gap-3">
          <img
            src={prod2}
            alt=""
            className="h-10 w-10 shrink-0 rounded-lg object-cover"
          />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink sm:text-sm">
                Everyday Runners
              </p>
              <p className="text-[11px] text-ink-faint">Rs 1,249</p>
            </div>
            <span className="text-[11px] font-medium text-ink-soft">x1</span>
          </div>
        </div>
      </MockRow>
      <div className="rounded-xl border border-violet/25 bg-violet/10 px-3.5 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-violet">
          Payment method
        </p>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-surface px-3 py-1.5 text-[11px] font-medium text-ink shadow-sm ring-1 ring-ink/10">
            UPI
          </span>
          <span className="rounded-full px-3 py-1.5 text-[11px] font-medium text-ink-soft">
            Cash on delivery
          </span>
        </div>
      </div>
      <button className="w-full rounded-full bg-[image:var(--gradient-brand)] py-3 text-xs font-semibold text-white sm:text-sm">
        Confirm order · Rs 2,248
      </button>
    </div>
  );
}

function DashboardMock() {
  const orders = [
    { id: "#1042", name: "Ayesha K.", status: "Awaiting confirmation", tone: "pending" as const },
    { id: "#1041", name: "Bilal R.", status: "Confirmed", tone: "done" as const },
    { id: "#1039", name: "Sana M.", status: "Confirmed", tone: "done" as const },
    { id: "#1037", name: "Hamza T.", status: "Awaiting confirmation", tone: "pending" as const },
  ];
  return (
    <div className="flex flex-col gap-2.5">
      {orders.map((o) => (
        <MockRow key={o.id}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink sm:text-sm">
                {o.id} · {o.name}
              </p>
              <p className="text-[11px] text-ink-faint">{o.status}</p>
            </div>
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                o.tone === "done" ? "bg-teal" : "bg-amber",
              )}
            />
          </div>
        </MockRow>
      ))}
    </div>
  );
}

function ChatMock() {
  const messages = [
    {
      name: "Zainab",
      text: "Ordered straight from the WhatsApp link, so easy.",
      rating: 5,
    },
    {
      name: "Hamza",
      text: "Loved seeing order status without asking in DMs.",
      rating: 5,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {messages.map((m) => (
        <MockRow key={m.name}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-ink sm:text-sm">
                {m.name}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-ink-soft">
                {m.text}
              </p>
            </div>
            <span className="shrink-0 text-[11px] font-medium text-amber">
              {"★".repeat(m.rating)}
            </span>
          </div>
        </MockRow>
      ))}
      <button className="flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] py-3 text-xs font-semibold text-white sm:text-sm">
        <MessageCircle size={14} />
        Chat with seller
      </button>
    </div>
  );
}
