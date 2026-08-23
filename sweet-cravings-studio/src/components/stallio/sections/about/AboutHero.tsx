import { useRef, useState } from "react";
import { Sparkles, Link2, ArrowRight, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../../Container";
import { CTAButton } from "../../CTAButton";
import { RouteDivider } from "../../RouteDivider";
import { useCountUp } from "@/hooks/use-count-up";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";

const statValues = [3, 0, 1];
type TranslatedStat = { suffix: string; label: string };

export function AboutHero() {
  const { t } = useTranslation("about");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const stats = (
    t("hero.stats", { returnObjects: true }) as TranslatedStat[]
  ).map((stat, i) => ({ ...stat, value: statValues[i]! }));

  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet/25 blur-[120px]"
        style={{ animation: "drift-c 22s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-pink/15 blur-[130px]"
        style={{ animation: "drift-a 26s ease-in-out infinite" }}
      />

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div ref={ref} data-visible={visible} className="reveal-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-dim px-4 py-1.5">
              <Sparkles size={14} className="text-lime" strokeWidth={2.5} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="mt-6 font-display text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              {t("hero.titleLead")}{" "}
              <span className="bg-[image:var(--gradient-warm)] bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {t("hero.description")}
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
              <CTAButton href="/#final-cta" size="lg">
                {t("hero.ctaPrimary")}
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </CTAButton>
              <CTAButton href="/#inside-the-box" variant="outline" size="lg">
                {t("hero.ctaSecondary")}
              </CTAButton>
            </div>

            <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/10 pt-6">
              {stats.map((stat, i) => (
                <StatItem key={stat.label} stat={stat} index={i} visible={visible} />
              ))}
            </dl>
          </div>

          <div
            data-visible={visible}
            className="reveal-right relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <PhotoCollage />
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function StatItem({
  stat,
  index,
  visible,
}: {
  stat: TranslatedStat & { value: number };
  index: number;
  visible: boolean;
}) {
  const count = useCountUp(stat.value, visible, 900 + index * 150);
  return (
    <div>
      <dt className="sr-only">{stat.label}</dt>
      <dd className="font-display text-xl font-semibold tabular-nums text-ink sm:text-2xl">
        {count}
        {stat.suffix}
      </dd>
      <p className="text-xs text-ink-soft sm:text-sm">{stat.label}</p>
    </div>
  );
}

const collagePhotos = [
  { src: prod1, rotate: "-rotate-6", pos: "left-0 top-6", size: "h-36 w-32 sm:h-44 sm:w-40" },
  { src: prod2, rotate: "rotate-3", pos: "left-1/2 top-0 -translate-x-1/2", size: "h-44 w-36 sm:h-56 sm:w-44" },
  { src: prod3, rotate: "rotate-8", pos: "right-0 top-10", size: "h-32 w-28 sm:h-40 sm:w-36" },
];

function PhotoCollage() {
  const { t } = useTranslation("about");
  return (
    <div className="relative mx-auto h-72 w-full max-w-md sm:h-80">
      {collagePhotos.map((photo, i) => (
        <TiltPhoto key={photo.src} photo={photo} index={i} />
      ))}

      <div
        className="absolute -left-2 bottom-2 z-20 flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface px-3 py-1.5 shadow-lg sm:-left-6"
        style={{ animation: "float-slow 5s ease-in-out infinite" }}
      >
        <Link2 size={13} className="text-lime" strokeWidth={2.5} />
        <span className="text-[10px] font-semibold text-ink sm:text-xs">
          stallio.shop/you
        </span>
      </div>

      <div
        className="absolute -right-2 bottom-16 z-20 flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-white shadow-lg sm:-right-6"
        style={{ animation: "float-slow 5s ease-in-out infinite 1s" }}
      >
        <ShieldCheck size={13} className="text-lime" strokeWidth={2.5} />
        <span className="text-[10px] font-semibold sm:text-xs">
          {t("hero.trustedBadge")}
        </span>
      </div>
    </div>
  );
}

function TiltPhoto({
  photo,
  index,
}: {
  photo: (typeof collagePhotos)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const handleMove = () => {
    setHover(true);
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={handleMove}
      onPointerLeave={() => setHover(false)}
      className={cn(
        "tilt-card absolute overflow-hidden rounded-3xl border-4 border-surface shadow-[0_24px_50px_-24px_rgba(0,0,0,0.5)] transition-transform duration-300",
        photo.pos,
        photo.size,
        hover ? "rotate-0 z-30 scale-105" : cn(photo.rotate, "z-10"),
      )}
      style={{
        animation: `float-slow 6s ease-in-out infinite ${index * 0.6}s`,
      }}
    >
      <img
        src={photo.src}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent"
      />
    </div>
  );
}
