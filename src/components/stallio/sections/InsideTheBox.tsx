import { useState } from "react";
import {
  LayoutGrid,
  ShoppingCart,
  BarChart3,
  MessageSquare,
  Star,
  Check,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../Container";
import { RouteDivider } from "../RouteDivider";
import { ProductPreviewCard } from "../ProductPreviewCard";
import { useReveal } from "@/hooks/use-reveal";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";
import prod5 from "@/assets/prod-5.jpg";
import prod6 from "@/assets/prod-6.jpg";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: LayoutGrid,
    title: "Product pages",
    description:
      "Every item gets its own page with photos, price, and variants — no more scrolling old posts to find one product.",
  },
  {
    icon: ShoppingCart,
    title: "Cart & checkout",
    description:
      "Customers add multiple items and check out in one go, with UPI or cash-on-delivery built in.",
  },
  {
    icon: BarChart3,
    title: "Order dashboard",
    description:
      "See every order, its status, and buyer details in one place instead of scattered across chats.",
  },
  {
    icon: MessageSquare,
    title: "Direct customer chat",
    description:
      "A tap-to-chat button keeps the personal, DM-style conversation you already have with buyers.",
  },
];

export function InsideTheBox() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="inside-the-box" className="relative bg-paper-dim">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div
          ref={ref}
          className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12"
        >
          <div data-visible={visible} className="reveal">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
              Inside the box
            </span>
            <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              Everything inside your storefront
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-lg">
              One link opens onto a full storefront — not just a product list.
              Hover or tap any product in the phone to see the page your
              customers get.
            </p>

            <ul className="mt-8 flex flex-col gap-5 sm:mt-10 sm:gap-6">
              {features.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet/15 text-teal">
                    <Icon size={19} strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold text-ink">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div data-visible={visible} className="reveal-right">
            <StorefrontMockup />
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

type Product = {
  id: string;
  name: string;
  price: string;
  img: string;
  category: string;
  sizes: string[];
  note: string;
};

const products: Product[] = [
  {
    id: "p1",
    name: "Chunky Sneakers",
    price: "Rs 999",
    img: prod1,
    category: "Shoes",
    sizes: ["38", "39", "40", "41"],
    note: "Free delivery on orders above Rs 2,500",
  },
  {
    id: "p2",
    name: "Everyday Runners",
    price: "Rs 1,249",
    img: prod2,
    category: "Shoes",
    sizes: ["39", "40", "42"],
    note: "Cash on delivery available",
  },
  {
    id: "p3",
    name: "Retro High-Tops",
    price: "Rs 1,499",
    img: prod3,
    category: "Shoes",
    sizes: ["40", "41", "43"],
    note: "Only 4 pairs left in stock",
  },
  {
    id: "p4",
    name: "Court Classics",
    price: "Rs 1,749",
    img: prod4,
    category: "Shoes",
    sizes: ["38", "41", "42"],
    note: "Ships next working day",
  },
  {
    id: "p5",
    name: "Street Trainers",
    price: "Rs 1,999",
    img: prod5,
    category: "Shoes",
    sizes: ["39", "40", "41", "44"],
    note: "New drop this week",
  },
  {
    id: "p6",
    name: "Weekend Slip-Ons",
    price: "Rs 2,249",
    img: prod6,
    category: "Shoes",
    sizes: ["38", "40", "42"],
    note: "Bundle 2 and save 10%",
  },
];

const orders = [
  { id: "#1042", buyer: "Ayesha K.", status: "pending" as const },
  { id: "#1041", buyer: "Bilal R.", status: "pending" as const },
  { id: "#1039", buyer: "Sana M.", status: "confirmed" as const },
];

const reviews = [
  {
    name: "Zainab",
    rating: 5,
    note: "Ordered straight from the WhatsApp link, so easy.",
  },
  {
    name: "Hamza",
    rating: 5,
    note: "Loved seeing order status without asking in DMs.",
  },
  {
    name: "Mehak",
    rating: 4,
    note: "Store looks legit, not just a chat catalog anymore.",
  },
];

const tabs = [
  { key: "shop" as const, label: "Shop" },
  { key: "orders" as const, label: "Orders" },
  { key: "reviews" as const, label: "Reviews" },
];

type TabKey = (typeof tabs)[number]["key"];

function StorefrontMockup() {
  const [activeTab, setActiveTab] = useState<TabKey>("shop");
  const [pinned, setPinned] = useState<Product | null>(null);
  const [hovered, setHovered] = useState<Product | null>(null);

  // A click "pins" the preview open (works on touch too); hovering a
  // product with a mouse previews it without needing a click.
  const selected = pinned ?? hovered;

  return (
    <div className="relative lg:[perspective:1600px]">
      <div className="absolute -right-6 -top-8 h-48 w-48 rounded-full bg-pink/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-8 h-52 w-52 rounded-full bg-teal/20 blur-3xl" />

      <div
        className={[
          "relative mx-auto w-[250px] transition-transform duration-500 sm:w-[320px]",
          selected ? "lg:[--sx:-5rem] lg:[--sr:9deg]" : "",
        ].join(" ")}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateX(var(--sx,0px)) rotateY(var(--sr,0deg))",
        }}
      >
        <div className="relative rounded-[2.25rem] border-[6px] border-black bg-black p-2 shadow-[0_24px_40px_rgba(0,0,0,0.55)]">
          <div className="overflow-hidden rounded-[1.6rem] bg-surface">
            <div className="flex items-center justify-center bg-black py-2">
              <div className="h-1.5 w-16 rounded-full bg-white/25" />
            </div>

            <div className="flex items-center justify-between gap-2 px-4 pt-4">
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-ink">
                  Your Shop
                </p>
                <p className="truncate text-[10px] text-ink-faint">
                  128 products &bull; Lahore
                </p>
              </div>
              <span className="flex h-8 shrink-0 items-center rounded-full bg-black px-3 text-[10px] font-semibold text-teal">
                Cart &bull; 2
              </span>
            </div>

            <div className="mt-3.5 flex gap-4 border-b border-ink/8 px-4 text-xs font-medium text-ink-faint">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.key);
                    setPinned(null);
                    setHovered(null);
                  }}
                  className={`relative pb-2 transition-colors duration-200 ${
                    activeTab === tab.key ? "text-ink" : "hover:text-ink-soft"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-teal" />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[196px] px-4 py-4">
              {activeTab === "shop" && (
                <div className="grid grid-cols-2 gap-2.5">
                  {products.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setPinned((cur) =>
                          cur?.id === item.id ? null : item,
                        )
                      }
                      onMouseEnter={() => setHovered(item)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(item)}
                      onBlur={() => setHovered(null)}
                      aria-label={`Preview ${item.name}`}
                      className={`rounded-xl border p-1.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-teal/60 ${
                        selected?.id === item.id
                          ? "border-teal bg-violet/10"
                          : "border-ink/8 bg-surface"
                      }`}
                      style={{
                        animation:
                          "pop-in-item 0.45s cubic-bezier(0.34,1.56,0.64,1) both",
                        animationDelay: `${i * 60}ms`,
                      }}
                    >
                      <div className="h-16 w-full overflow-hidden rounded-lg bg-paper-dim">
                        <img
                          src={item.img}
                          alt={item.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="mt-1.5 truncate text-[10px] font-semibold text-ink">
                        {item.price}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === "orders" && (
                <div className="flex flex-col gap-2">
                  {orders.map((order, i) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between gap-2 rounded-xl border border-ink/8 bg-surface px-3 py-2.5"
                      style={{
                        animation:
                          "pop-in-item 0.45s cubic-bezier(0.34,1.56,0.64,1) both",
                        animationDelay: `${i * 70}ms`,
                      }}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-ink">
                          {order.id} &bull; {order.buyer}
                        </p>
                        <p className="truncate text-[10px] text-ink-faint">
                          {order.status === "pending"
                            ? "Awaiting confirmation"
                            : "Confirmed"}
                        </p>
                      </div>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          order.status === "pending"
                            ? "bg-amber/20 text-amber"
                            : "bg-teal/20 text-teal"
                        }`}
                      >
                        {order.status === "pending" ? (
                          <Clock size={12} strokeWidth={2.5} />
                        ) : (
                          <Check size={12} strokeWidth={2.5} />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="flex flex-col gap-2">
                  {reviews.map((review, i) => (
                    <div
                      key={review.name}
                      className="rounded-xl border border-ink/8 bg-surface px-3 py-2.5"
                      style={{
                        animation:
                          "pop-in-item 0.45s cubic-bezier(0.34,1.56,0.64,1) both",
                        animationDelay: `${i * 70}ms`,
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-[11px] font-semibold text-ink">
                          {review.name}
                        </p>
                        <span className="flex shrink-0 items-center gap-0.5 text-amber">
                          {Array.from({ length: review.rating }).map((_, s) => (
                            <Star
                              key={s}
                              size={9}
                              fill="currentColor"
                              strokeWidth={0}
                            />
                          ))}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[10px] leading-relaxed text-ink-soft">
                        {review.note}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-ink/8 bg-paper-dim px-4 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-teal"
                  style={{ animation: "pulse-dot 1.8s ease-in-out infinite" }}
                  aria-hidden="true"
                />
                <span className="truncate text-[10px] font-medium text-ink-soft">
                  3 orders awaiting confirmation
                </span>
              </div>
              <span className="shrink-0 text-[10px] font-semibold text-lime">
                View dashboard
              </span>
            </div>
          </div>
        </div>

        <div
          className="absolute -left-4 -top-3 flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-3 py-1.5 shadow-lg sm:-left-10 sm:px-3.5 sm:py-2"
          style={{ animation: "float-slow 5s ease-in-out infinite" }}
        >
          <LayoutGrid size={13} className="text-teal" strokeWidth={2.5} />
          <span className="text-[10px] font-semibold text-ink sm:text-xs">
            One link, full store
          </span>
        </div>
      </div>

      <ProductPreviewCard
        product={selected}
        onClose={pinned ? () => setPinned(null) : undefined}
      />
    </div>
  );
}
