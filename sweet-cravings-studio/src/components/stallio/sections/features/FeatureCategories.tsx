import {
  LayoutGrid,
  Palette,
  Smartphone,
  Tag,
  ShoppingCart,
  Wallet,
  Ban,
  Link2,
  BarChart3,
  Search,
  Bell,
  ClipboardList,
  MessageSquare,
  Star,
  Instagram,
  Infinity as InfinityIcon,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type Category = {
  id: string;
  label: string;
  heading: string;
  accent: "violet" | "teal" | "pink" | "amber";
  features: Feature[];
};

const accentClasses: Record<
  Category["accent"],
  { icon: string; glow: string; border: string; dot: string }
> = {
  violet: { icon: "bg-violet/15 text-violet", glow: "bg-violet/40", border: "hover:border-violet/50", dot: "bg-violet" },
  teal: { icon: "bg-teal/15 text-teal", glow: "bg-teal/40", border: "hover:border-teal/50", dot: "bg-teal" },
  pink: { icon: "bg-pink/15 text-pink", glow: "bg-pink/40", border: "hover:border-pink/50", dot: "bg-pink" },
  amber: { icon: "bg-amber/15 text-amber", glow: "bg-amber/40", border: "hover:border-amber/50", dot: "bg-amber" },
};

const categories: Category[] = [
  {
    id: "storefront",
    label: "Storefront & catalog",
    heading: "Make your catalog feel like a store",
    accent: "violet",
    features: [
      { icon: InfinityIcon, title: "Unlimited products", description: "No catalog cap, ever. List one item or one thousand." },
      { icon: LayoutGrid, title: "Dedicated product pages", description: "Photos, price, and variants on a page you can share anywhere." },
      { icon: Tag, title: "Variants & pricing", description: "Sizes, colors, and options, priced and tracked separately." },
      { icon: Palette, title: "Light & dark mode", description: "Your storefront adapts to how your customers browse." },
      { icon: Smartphone, title: "Mobile-first design", description: "Every page built for the phone your buyers are already on." },
      { icon: Link2, title: "One shareable link", description: "No domain to buy, configure, or renew." },
    ],
  },
  {
    id: "selling",
    label: "Selling & checkout",
    heading: "Turn a browse into a confirmed order",
    accent: "teal",
    features: [
      { icon: ShoppingCart, title: "Cart & checkout", description: "Add multiple items and check out in one pass, not one DM at a time." },
      { icon: Wallet, title: "UPI & cash on delivery", description: "Both built in from day one, with no setup required." },
      { icon: Ban, title: "No payment gateway needed", description: "Skip the paperwork, approval wait, and integration work." },
      { icon: Instagram, title: "Built for Instagram & WhatsApp", description: "Made to travel through the apps you already sell on." },
    ],
  },
  {
    id: "orders",
    label: "Orders & operations",
    heading: "Run orders without living in your inbox",
    accent: "pink",
    features: [
      { icon: BarChart3, title: "Order dashboard", description: "See every order, status, and buyer detail in one place." },
      { icon: ClipboardList, title: "Status tracking", description: "Move orders from pending to confirmed to shipped." },
      { icon: Search, title: "Searchable history", description: "Find any past order by buyer, product, or date." },
      { icon: Bell, title: "Instant updates", description: "Your dashboard reflects a new order the second it's placed." },
    ],
  },
  {
    id: "growth",
    label: "Customers & growth",
    heading: "Build the trust that keeps buyers coming back",
    accent: "amber",
    features: [
      { icon: MessageSquare, title: "Tap-to-chat button", description: "Keep the personal, DM-style conversation buyers already like." },
      { icon: Star, title: "Reviews & ratings", description: "Social proof shown right on your storefront, not buried in chat." },
      { icon: Palette, title: "Custom store branding", description: "Your logo, bio, and colors, not a generic template." },
    ],
  },
];

export function FeatureCategories() {
  return (
    <section id="all-features" className="relative bg-paper">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            All features
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Everything, grouped by what it does for you
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            Four categories, one connected storefront. Nothing here is a
            paid add-on.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-16 lg:mt-16 lg:gap-20">
          {categories.map((category, i) => (
            <CategoryBlock key={category.id} category={category} index={i} />
          ))}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function CategoryBlock({ category, index }: { category: Category; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const accent = accentClasses[category.accent];

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className={cn("h-2 w-2 shrink-0 rounded-full", accent.dot)} aria-hidden="true" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint sm:text-xs">
          {String(index + 1).padStart(2, "0")} &mdash; {category.label}
        </span>
      </div>
      <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
        {category.heading}
      </h3>

      <div
        ref={ref}
        className={cn(
          "mt-7 grid gap-4 sm:grid-cols-2 sm:gap-5",
          category.features.length >= 5 ? "lg:grid-cols-3" : "lg:grid-cols-4",
        )}
      >
        {category.features.map((feature, i) => (
          <div
            key={feature.title}
            data-visible={visible}
            className="reveal"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5 transition-all duration-300 hover:-translate-y-1",
                accent.border,
              )}
            >
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-50",
                  accent.glow,
                )}
              />
              <span className={cn("relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110", accent.icon)}>
                <feature.icon size={18} strokeWidth={2} />
              </span>
              <h4 className="relative mt-4 font-display text-sm font-semibold text-ink sm:text-base">
                {feature.title}
              </h4>
              <p className="relative mt-1.5 text-xs leading-relaxed text-ink-soft sm:text-sm">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
