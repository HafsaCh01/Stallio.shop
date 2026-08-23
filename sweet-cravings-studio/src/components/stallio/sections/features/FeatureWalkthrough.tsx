import { useEffect, useState, type ReactNode } from "react";
import {
  Store,
  Wallet,
  ClipboardList,
  MessageCircle,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";

type TabId = "storefront" | "checkout" | "dashboard" | "chat";
type Accent = "violet" | "teal" | "pink" | "lime";

const tabIds: TabId[] = ["storefront", "checkout", "dashboard", "chat"];
const tabIcons: Record<TabId, LucideIcon> = {
  storefront: Store,
  checkout: Wallet,
  dashboard: ClipboardList,
  chat: MessageCircle,
};
const tabAccents: Record<TabId, Accent> = {
  storefront: "violet",
  checkout: "pink",
  dashboard: "teal",
  chat: "lime",
};

type TranslatedTab = {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

const accentText: Record<Accent, string> = {
  violet: "text-violet",
  teal: "text-teal",
  pink: "text-pink",
  lime: "text-lime",
};

const accentBg: Record<Accent, string> = {
  violet: "bg-violet/15 text-violet ring-violet/30",
  teal: "bg-teal/15 text-teal ring-teal/30",
  pink: "bg-pink/15 text-pink ring-pink/30",
  lime: "bg-lime/15 text-lime ring-lime/30",
};

const accentActiveTab: Record<Accent, string> = {
  violet: "bg-[image:var(--gradient-brand)] text-white shadow-violet/30",
  teal: "bg-[linear-gradient(90deg,var(--teal),var(--violet))] text-white shadow-teal/30",
  pink: "bg-[image:var(--gradient-brand)] text-white shadow-pink/30",
  lime: "bg-[linear-gradient(90deg,var(--lime),var(--pink))] text-white shadow-lime/30",
};

const AUTO_MS = 4200;

export function FeatureWalkthrough() {
  const { t } = useTranslation("features");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState<TabId>("storefront");
  const [paused, setPaused] = useState(false);

  const tabsData = t("walkthrough.tabs", {
    returnObjects: true,
  }) as Record<TabId, TranslatedTab>;

  const tabs = tabIds.map((id) => ({
    id,
    icon: tabIcons[id],
    accent: tabAccents[id],
    ...tabsData[id],
  }));

  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0]!;

  useEffect(() => {
    if (paused || !visible) return;
    const id = window.setInterval(() => {
      setActive((prev) => {
        const idx = tabIds.indexOf(prev);
        return tabIds[(idx + 1) % tabIds.length]!;
      });
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, visible]);

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
            {t("walkthrough.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {t("walkthrough.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            {t("walkthrough.description")}
          </p>
        </div>

        {/* Tab switcher */}
        <div
          role="tablist"
          aria-label={t("walkthrough.tabsLabel")}
          className="mx-auto mt-9 flex max-w-full flex-wrap items-center justify-center gap-2 sm:mt-11"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-tight transition-all duration-300 sm:text-sm",
                  isActive
                    ? cn("border-transparent shadow-lg", accentActiveTab[tab.accent])
                    : "border-ink/12 bg-surface text-ink-soft hover:border-ink/25 hover:text-ink",
                )}
              >
                <Icon size={15} strokeWidth={2.3} />
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
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
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
                  {t("walkthrough.storeUrlLabel")}
                </span>
              </div>
              <div className="flex min-h-[300px] flex-col justify-center p-4 sm:min-h-[340px] sm:p-5">
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
    <div className="grid grid-cols-2 gap-2.5">
      {products.map((p) => (
        <div
          key={p.name}
          className="group overflow-hidden rounded-xl border border-ink/10 bg-paper-dim"
        >
          <div className="aspect-[6/5] overflow-hidden bg-paper">
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
  const { t } = useTranslation("features");
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
                {t("walkthrough.checkoutMock.product1")}
              </p>
              <p className="text-[11px] text-ink-faint">Rs 999</p>
            </div>
            <span className="text-[11px] font-medium text-ink-soft">
              {t("walkthrough.checkoutMock.qty")}
            </span>
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
                {t("walkthrough.checkoutMock.product2")}
              </p>
              <p className="text-[11px] text-ink-faint">Rs 1,249</p>
            </div>
            <span className="text-[11px] font-medium text-ink-soft">
              {t("walkthrough.checkoutMock.qty")}
            </span>
          </div>
        </div>
      </MockRow>
      <div className="rounded-xl border border-violet/25 bg-violet/10 px-3.5 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-violet">
          {t("walkthrough.checkoutMock.paymentMethod")}
        </p>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-surface px-3 py-1.5 text-[11px] font-medium text-ink shadow-sm ring-1 ring-ink/10">
            {t("walkthrough.checkoutMock.upi")}
          </span>
          <span className="rounded-full px-3 py-1.5 text-[11px] font-medium text-ink-soft">
            {t("walkthrough.checkoutMock.cod")}
          </span>
        </div>
      </div>
      <button className="w-full rounded-full bg-[image:var(--gradient-brand)] py-3 text-xs font-semibold text-white sm:text-sm">
        {t("walkthrough.checkoutMock.confirmOrder")}
      </button>
    </div>
  );
}

function DashboardMock() {
  const { t } = useTranslation("features");
  const orders = [
    { id: "#1042", name: "Ayesha K.", status: t("walkthrough.dashboardMock.awaitingConfirmation"), tone: "pending" as const },
    { id: "#1041", name: "Bilal R.", status: t("walkthrough.dashboardMock.confirmed"), tone: "done" as const },
    { id: "#1039", name: "Sana M.", status: t("walkthrough.dashboardMock.confirmed"), tone: "done" as const },
    { id: "#1037", name: "Hamza T.", status: t("walkthrough.dashboardMock.awaitingConfirmation"), tone: "pending" as const },
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
  const { t } = useTranslation("features");
  const messages = [
    {
      name: "Zainab",
      text: t("walkthrough.chatMock.review1"),
      rating: 5,
    },
    {
      name: "Hamza",
      text: t("walkthrough.chatMock.review2"),
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
        {t("walkthrough.chatMock.chatWithSeller")}
      </button>
    </div>
  );
}
