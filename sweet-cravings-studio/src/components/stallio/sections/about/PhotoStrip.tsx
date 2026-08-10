import { RouteDivider } from "../../RouteDivider";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";
import prod5 from "@/assets/prod-5.jpg";
import prod6 from "@/assets/prod-6.jpg";

const photos = [
  { src: prod1, caption: "Footwear" },
  { src: prod2, caption: "Accessories" },
  { src: prod3, caption: "Beauty" },
  { src: prod4, caption: "Apparel" },
  { src: prod5, caption: "Home goods" },
  { src: prod6, caption: "Handmade" },
];

/**
 * A continuously drifting strip of real storefront photos — a livelier,
 * more animated stand-in for a static gallery grid.
 */
export function PhotoStrip() {
  const track = [...photos, ...photos];

  return (
    <section className="relative overflow-hidden bg-paper py-10 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-0 h-56 w-56 -translate-y-1/2 rounded-full bg-violet/20 blur-[120px]"
        style={{ animation: "drift-a 21s ease-in-out infinite" }}
      />

      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent sm:w-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent sm:w-32"
        />

        <div className="marquee-track flex w-max items-center gap-4 sm:gap-5">
          {track.map((photo, i) => (
            <figure
              key={`${photo.caption}-${i}`}
              className="group relative h-32 w-44 shrink-0 overflow-hidden rounded-2xl border border-ink/10 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.9)] sm:h-40 sm:w-56"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/75 via-violet/10 to-transparent"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-navy/60 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm sm:text-xs">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <RouteDivider className="relative z-10 mt-10 sm:mt-14" />
    </section>
  );
}
