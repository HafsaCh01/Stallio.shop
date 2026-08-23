import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Store,
  ImagePlus,
  Share2,
  Clock,
  Smartphone,
  Wifi,
  Signal,
  BatteryFull,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import { Container } from "../../Container";
import { CTAButton } from "../../CTAButton";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Accent = "violet" | "teal" | "pink";
const screenNumbers = ["01", "02", "03"];
const screenIcons: LucideIcon[] = [Store, ImagePlus, Share2];
const screenAccents: Accent[] = ["violet", "teal", "pink"];

const accentBg: Record<Accent, string> = {
  violet: "bg-violet",
  teal: "bg-teal",
  pink: "bg-pink",
};

const accentRing: Record<Accent, string> = {
  violet: "ring-violet/30 bg-violet/15 text-violet",
  teal: "ring-teal/30 bg-teal/15 text-teal",
  pink: "ring-pink/30 bg-pink/15 text-pink",
};

type TranslatedScreen = { label: string };

export function HowItWorksHero() {
  const { t } = useTranslation("howItWorks");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0,
  );
  const scrollDelta = useRef(0);

  const translatedScreens = t("hero.screens", {
    returnObjects: true,
  }) as TranslatedScreen[];
  const screens = screenNumbers.map((number, i) => ({
    number,
    icon: screenIcons[i]!,
    accent: screenAccents[i]!,
    label: translatedScreens[i]?.label ?? "",
  }));

  const products = t("hero.products", {
    returnObjects: true,
  }) as { name: string }[];
  const channels = t("hero.channels", { returnObjects: true }) as string[];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % screens.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, [paused, screens.length]);

  // Scrolling the page also nudges the phone screen forward.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastScrollY.current;
      lastScrollY.current = y;
      scrollDelta.current += Math.abs(diff);

      if (scrollDelta.current > 220) {
        scrollDelta.current = 0;
        setActive((prev) => (prev + 1) % screens.length);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [screens.length]);

  const current = screens[active] ?? screens[0]!;
  const CurrentIcon = current.icon;

  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[-8%] h-96 w-96 rounded-full bg-violet/20 blur-[140px]"
        style={{ animation: "drift-a 24s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-teal/15 blur-[130px]"
        style={{ animation: "drift-b 27s ease-in-out infinite" }}
      />

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div ref={ref} data-visible={visible} className="reveal-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-dim px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="mt-6 font-display text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.3rem]">
              {t("hero.titleLead")}{" "}
              <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {t("hero.description")}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-faint sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="text-teal" />
                {t("hero.firstDraft")}
              </span>
              <span className="text-ink-faint/50">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Smartphone size={14} className="text-pink" />
                {t("hero.mobileFirst")}
              </span>
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
              <CTAButton href="/#final-cta" size="lg">
                {t("hero.ctaPrimary")}
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </CTAButton>
              <CTAButton href="/" variant="outline" size="lg">
                {t("hero.ctaSecondary")}
              </CTAButton>
            </div>
          </div>

          <div
            data-visible={visible}
            className="reveal-right relative mx-auto w-full max-w-[300px] lg:mx-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] blur-3xl transition-colors duration-700",
                current.accent === "violet" && "bg-violet/20",
                current.accent === "teal" && "bg-teal/15",
                current.accent === "pink" && "bg-pink/15",
              )}
            />

            {/* Phone frame */}
            <div className="relative overflow-hidden rounded-[2.4rem] border border-ink/12 bg-surface p-2.5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.4)]">
              <div className="overflow-hidden rounded-[1.9rem] bg-paper">
                <div className="flex items-center justify-between px-5 pb-1.5 pt-3 text-[10px] font-semibold text-ink">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <Signal size={11} />
                    <Wifi size={11} />
                    <BatteryFull size={13} />
                  </div>
                </div>

                <div className="min-h-[380px] px-4 pb-5 pt-2">
                  <div key={current.number} className="animate-fade-up">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-xl",
                          accentRing[current.accent],
                        )}
                      >
                        <CurrentIcon size={15} strokeWidth={2.2} />
                      </span>
                      <div>
                        <p className="font-display text-[9px] font-semibold tracking-wider text-ink-faint">
                          {t("hero.stepLabel", { number: current.number })}
                        </p>
                        <p className="text-xs font-semibold text-ink">
                          {current.label}
                        </p>
                      </div>
                    </div>

                    {active === 0 && (
                      <div className="mt-5 space-y-3">
                        <div className="rounded-xl border border-ink/10 bg-surface p-3.5">
                          <p className="text-[9px] font-semibold uppercase tracking-wide text-ink-faint">
                            {t("hero.storeName")}
                          </p>
                          <p className="mt-1 font-display text-sm font-semibold text-ink">
                            {t("hero.storeNameValue")}
                          </p>
                        </div>
                        <div className="rounded-xl border border-teal/30 bg-teal/10 p-3.5">
                          <p className="text-[9px] font-semibold uppercase tracking-wide text-teal">
                            {t("hero.yourLink")}
                          </p>
                          <p className="mt-1 font-display text-sm font-semibold text-ink">
                            stallio.shop/hafsa
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-lime">
                          <Check size={12} strokeWidth={3} />
                          {t("hero.linkIsLive")}
                        </div>
                      </div>
                    )}

                    {active === 1 && (
                      <div className="mt-5 grid grid-cols-2 gap-2.5">
                        {[
                          { name: products[0]?.name ?? "", price: "$24", img: prod1 },
                          { name: products[1]?.name ?? "", price: "$18", img: prod2 },
                          { name: products[2]?.name ?? "", price: "$16", img: prod3 },
                          { name: products[3]?.name ?? "", price: "+" },
                        ].map((p, i) => (
                          <div
                            key={p.name}
                            className={cn(
                              "rounded-xl border p-2.5",
                              i === 3
                                ? "flex items-center justify-center border-dashed border-ink/20 text-ink-faint"
                                : "border-ink/10 bg-surface",
                            )}
                          >
                            {i === 3 ? (
                              <ImagePlus size={18} />
                            ) : (
                              <>
                                <div className="aspect-square w-full overflow-hidden rounded-lg">
                                  <img
                                    src={p.img}
                                    alt={p.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <p className="mt-2 text-[10px] font-semibold text-ink">
                                  {p.name}
                                </p>
                                <p className="text-[10px] font-semibold text-teal">
                                  {p.price}
                                </p>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {active === 2 && (
                      <div className="mt-5 space-y-2.5">
                        {channels.map((ch, i) => (
                          <div
                            key={ch}
                            className="flex items-center justify-between rounded-xl border border-ink/10 bg-surface p-3"
                          >
                            <span className="text-xs font-medium text-ink">
                              {ch}
                            </span>
                            <span
                              className={cn(
                                "flex h-6 w-6 items-center justify-center rounded-full",
                                i === 0 && "bg-lime/20 text-lime",
                                i === 1 && "bg-pink/20 text-pink",
                                i === 2 && "bg-teal/20 text-teal",
                              )}
                            >
                              <Check size={11} strokeWidth={3} />
                            </span>
                          </div>
                        ))}
                        <div className="rounded-xl bg-[image:var(--gradient-brand)] p-3 text-center">
                          <p className="text-[11px] font-semibold text-white">
                            {t("hero.ordersWaiting")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* progress dots under the phone */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {screens.map((screen, i) => (
                <span
                  key={screen.number}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === active
                      ? cn("w-6", accentBg[screen.accent])
                      : "w-1.5 bg-ink/15",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
