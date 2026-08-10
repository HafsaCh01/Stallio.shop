import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Container } from "../../Container";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import prod4 from "@/assets/prod-4.jpg";
import prod5 from "@/assets/prod-5.jpg";
import prod6 from "@/assets/prod-6.jpg";

const shots = [
  {
    src: prod4,
    caption: "Footwear",
    span: "row-span-2",
  },
  {
    src: prod5,
    caption: "Home goods",
    span: "",
  },
  {
    src: prod6,
    caption: "Accessories",
    span: "",
  },
];

export function AboutGallery() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-paper-dim">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-teal/20 blur-[140px]"
      />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            What sellers ship
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Real products, real storefronts
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            From sneakers to skincare, every catalog on Stallio looks this
            clean out of the box.
          </p>
        </div>

        <div
          ref={ref}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:gap-5 lg:mt-16 lg:grid-cols-3"
        >
          {shots.map((shot, i) => (
            <GalleryTile
              key={shot.caption}
              shot={shot}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function GalleryTile({
  shot,
  index,
  visible,
}: {
  shot: { src: string; caption: string; span: string };
  index: number;
  visible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      data-visible={visible}
      className={cn("reveal", shot.span)}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={cn(
          "tilt-card group relative h-full min-h-[10rem] overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-[0_24px_50px_-32px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-violet/40",
          shot.span === "row-span-2" ? "sm:min-h-[21.5rem]" : "sm:min-h-[10rem]",
        )}
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <img
          src={shot.src}
          alt={shot.caption}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/0 to-navy/0"
        />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-navy/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {shot.caption}
        </span>
      </div>
    </div>
  );
}
