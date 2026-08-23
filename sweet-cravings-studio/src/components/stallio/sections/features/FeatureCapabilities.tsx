import {
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Store,
  Link2,
  LayoutGrid,
  ClipboardList,
  Smartphone,
  BadgePercent,
  FileText,
  Truck,
  FolderTree,
  Wallet,
  LineChart,
  MessageCircle,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Accent = "violet" | "teal" | "pink" | "lime";

type TranslatedCard = { title: string; description: string };
type Card = TranslatedCard & {
  icon: LucideIcon;
  accent: Accent;
};

// All 13 cards share one identical shape, size, and styling now — no card
// is visually promoted over the others.
const cardIcons: LucideIcon[] = [
  Store,
  Link2,
  LayoutGrid,
  ClipboardList,
  Smartphone,
  BadgePercent,
  FileText,
  Truck,
  FolderTree,
  Wallet,
  LineChart,
  MessageCircle,
  LifeBuoy,
];
const cardAccents: Accent[] = [
  "violet",
  "teal",
  "violet",
  "pink",
  "lime",
  "pink",
  "violet",
  "teal",
  "lime",
  "violet",
  "lime",
  "teal",
  "pink",
];

const accentStyles: Record<
  Accent,
  { icon: string; border: string; shadow: string; dot: string; cssVar: string }
> = {
  violet: {
    icon: "bg-violet/15 text-violet group-hover:bg-violet/25",
    border: "hover:border-violet/45",
    shadow: "hover:shadow-violet/20",
    dot: "bg-violet",
    cssVar: "var(--violet)",
  },
  teal: {
    icon: "bg-teal/15 text-teal group-hover:bg-teal/25",
    border: "hover:border-teal/45",
    shadow: "hover:shadow-teal/20",
    dot: "bg-teal",
    cssVar: "var(--teal)",
  },
  pink: {
    icon: "bg-pink/15 text-pink group-hover:bg-pink/25",
    border: "hover:border-pink/45",
    shadow: "hover:shadow-pink/20",
    dot: "bg-pink",
    cssVar: "var(--pink)",
  },
  lime: {
    icon: "bg-lime/15 text-lime group-hover:bg-lime/25",
    border: "hover:border-lime/45",
    shadow: "hover:shadow-lime/20",
    dot: "bg-lime",
    cssVar: "var(--lime)",
  },
};

/** Sets --mx/--my on the element so a child spotlight can track the cursor. */
function useSpotlight() {
  return (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
}

// Deterministic "shuffled deck" rotation/jitter per card index, so the
// stacked look is consistent across renders instead of jumping around.
const DECK_ROTATIONS = [-7, 5, -3, 8, -6, 4, -9, 6, -2, 7, -5, 3, -8];
const DECK_JITTER_X = [3, -4, 2, -6, 5, -2, 4, -5, 3, -3, 6, -4, 2];
const DECK_JITTER_Y = [-2, 3, -4, 2, -3, 4, -2, 3, -5, 2, -3, 4, -2];

type Offset = { dx: number; dy: number };

export function FeatureCapabilities() {
  const { t } = useTranslation("features");
  const translatedCards = t("capabilities.cards", {
    returnObjects: true,
  }) as TranslatedCard[];
  const allCards: Card[] = translatedCards.map((card, i) => ({
    ...card,
    icon: cardIcons[i]!,
    accent: cardAccents[i]!,
  }));
  const TOTAL_CARDS = allCards.length;
  const { ref: revealRef, visible } = useReveal<HTMLDivElement>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [offsets, setOffsets] = useState<Offset[] | null>(null);
  const [dealt, setDealt] = useState(false);
  const lastScrollY = useRef(0);
  const rafId = useRef(0);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    [],
  );

  // Merge the scroll-reveal ref with our own measurement ref on one node.
  const setWrapperRef = useCallback(
    (el: HTMLDivElement | null) => {
      wrapperRef.current = el;
      revealRef.current = el;
    },
    [revealRef],
  );

  const measure = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const wrapperRect = wrapper.getBoundingClientRect();
    const deckX = wrapperRect.left + wrapperRect.width / 2;
    const deckY = wrapperRect.top + wrapperRect.height / 2;

    const next: Offset[] = cardRefs.current.map((el) => {
      if (!el) return { dx: 0, dy: 0 };
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      return { dx: deckX - cx, dy: deckY - cy };
    });
    setOffsets(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    let raf = 0;
    const handleResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(raf);
    };
  }, [measure]);

  // Scroll-driven deal: scrolling down into the section deals the cards,
  // scrolling back up above it gathers them back into the deck.
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const currentY = window.scrollY;
        const goingDown = currentY > lastScrollY.current;
        lastScrollY.current = currentY;

        const rect = wrapper.getBoundingClientRect();
        const inView =
          rect.top < window.innerHeight * 0.8 &&
          rect.bottom > window.innerHeight * 0.2;

        if (!inView) return;
        if (goingDown) setDealt(true);
        else setDealt(false);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const cardStyle = (index: number): CSSProperties => {
    const offset = offsets?.[index];
    if (dealt || !offset) {
      return {
        transform: "translate(0px, 0px) rotate(0deg) scale(1)",
        transitionDelay: dealt ? `${index * 45}ms` : "0ms",
        zIndex: dealt ? 1 : TOTAL_CARDS - index,
      };
    }
    const rot = DECK_ROTATIONS[index % DECK_ROTATIONS.length] ?? 0;
    const jx = DECK_JITTER_X[index % DECK_JITTER_X.length] ?? 0;
    const jy = DECK_JITTER_Y[index % DECK_JITTER_Y.length] ?? 0;
    return {
      transform: `translate(${offset.dx + jx}px, ${offset.dy + jy}px) rotate(${rot}deg) scale(0.78)`,
      transitionDelay: `${(TOTAL_CARDS - 1 - index) * 35}ms`,
      zIndex: TOTAL_CARDS - index,
    };
  };

  return (
    <section id="capabilities" className="relative overflow-hidden bg-paper">
      {/* Ambient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-pink/15 blur-[130px]"
        style={{ animation: "drift-b 26s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-violet/15 blur-[130px]"
        style={{ animation: "drift-c 28s ease-in-out infinite" }}
      />
      {/* Technical dot-grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(var(--ink) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 50% 35%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 50% 35%, black, transparent)",
        }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 flex items-center justify-center gap-1.5">
            {(["violet", "teal", "pink", "lime"] as const).map((a, i) => (
              <span
                key={a}
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  accentStyles[a].dot,
                )}
                style={{
                  animation: "pulse-dot 2.4s ease-in-out infinite",
                  animationDelay: `${i * 0.25}s`,
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            {t("capabilities.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {t("capabilities.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            {t("capabilities.description")}
          </p>
        </div>

        <div
          ref={setWrapperRef}
          data-visible={visible}
          className="reveal mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-3 lg:grid-cols-4"
        >
          {allCards.map((card, i) => (
            <FeatureCard
              key={card.title}
              card={card}
              cardRef={setCardRef(i)}
              style={cardStyle(i)}
              dealt={dealt}
            />
          ))}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function FeatureCard({
  card,
  cardRef,
  style,
  dealt,
}: {
  card: Card;
  cardRef: (el: HTMLDivElement | null) => void;
  style?: CSSProperties;
  dealt: boolean;
}) {
  const handleMouseMove = useSpotlight();
  const accent = accentStyles[card.accent];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={style}
      className={cn(
        "group relative flex h-full min-h-[188px] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5 transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-xl sm:p-6",
        accent.border,
        accent.shadow,
        !dealt && "pointer-events-none",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, ${accent.cssVar} 16%, transparent), transparent 70%)`,
        }}
      />
      <span
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105",
          accent.icon,
        )}
      >
        <card.icon size={16} strokeWidth={2} />
      </span>
      <h3 className="relative mt-4 font-display text-sm font-semibold leading-snug text-ink sm:text-[15px]">
        {card.title}
      </h3>
      <p className="relative mt-1.5 line-clamp-3 text-xs leading-relaxed text-ink-soft sm:text-[13px]">
        {card.description}
      </p>
    </div>
  );
}
