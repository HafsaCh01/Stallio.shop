import { Link2, Star } from "lucide-react";
import { Container } from "../Container";
import { CTAButton } from "../CTAButton";
import { RouteDivider } from "../RouteDivider";
import logo from "@/assets/stallio-logo.png";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-dim px-4 py-1.5">
            <Link2 size={14} className="text-lime" strokeWidth={2.5} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
              For Instagram &amp; WhatsApp sellers
            </span>
          </div>

          <h1 className="max-w-xl font-display text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4rem]">
            Your shop.
            <br />
            <span className="bg-[image:var(--gradient-warm)] bg-clip-text text-transparent">
              One link
            </span>{" "}
            away.
          </h1>

          <p className="max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
            Turn your Instagram or WhatsApp page into a real online store. Add
            products, share one link, and start taking orders — no domain and no
            payment gateway to set up.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <CTAButton href="#final-cta" size="md">
              Create your store
            </CTAButton>
            <CTAButton href="#how-it-works" variant="outline" size="md">
              See how it works
            </CTAButton>
          </div>

          <dl className="mt-2 flex w-full flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-6">
            <div>
              <dt className="sr-only">Setup time</dt>
              <dd className="font-display text-lg font-semibold text-ink">
                3 min
                <span className="ml-1.5 text-sm font-normal text-ink-soft">
                  to launch
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Domains required</dt>
              <dd className="font-display text-lg font-semibold text-ink">
                0
                <span className="ml-1.5 text-sm font-normal text-ink-soft">
                  domains needed
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Average rating</dt>
              <dd className="flex items-center gap-1 font-display text-lg font-semibold text-ink">
                4.9
                <span
                  className="flex items-center text-amber"
                  aria-hidden="true"
                >
                  <Star size={14} fill="currentColor" strokeWidth={0} />
                </span>
                <span className="text-sm font-normal text-ink-soft">
                  seller rating
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <HeroIllustration />
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

const heroItems = [
  {
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&q=80&auto=format&fit=crop",
    price: "Rs 1,499",
  },
  {
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&q=80&auto=format&fit=crop",
    price: "Rs 2,250",
  },
  {
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&q=80&auto=format&fit=crop",
    price: "Rs 899",
  },
  {
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&q=80&auto=format&fit=crop",
    price: "Rs 1,750",
  },
];

function HeroIllustration() {
  return (
    <div className="relative">
      <div className="absolute -right-6 -top-8 h-48 w-48 rounded-full bg-pink/25 blur-3xl" />
      <div className="absolute -bottom-10 -left-8 h-52 w-52 rounded-full bg-lime/25 blur-3xl" />
      <div className="absolute right-1/3 top-1/2 h-32 w-32 rounded-full bg-amber/15 blur-3xl" />

      <div className="relative mx-auto w-[240px] sm:w-[300px]">
        <div className="relative rounded-[2.25rem] border-[6px] border-black bg-black p-2 shadow-[0_24px_40px_rgba(0,0,0,0.55)]">
          <div className="overflow-hidden rounded-[1.6rem] bg-paper">
            <div className="flex items-center justify-center bg-black py-2">
              <div className="h-1.5 w-16 rounded-full bg-white/25" />
            </div>

            <div className="flex items-center gap-2 px-4 pt-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[image:var(--gradient-warm)]">
                <img src={logo} alt="" width={18} height={18} />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-ink">
                  Your Shop
                </p>
                <p className="truncate text-[10px] text-ink-faint">
                  stallio.shop/you
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 px-4 pb-5 pt-4">
              {heroItems.map((item) => (
                <div
                  key={item.price}
                  className="rounded-xl border border-ink/8 bg-surface p-1.5"
                >
                  <div className="h-16 w-full overflow-hidden rounded-lg bg-paper-dim">
                    <img
                      src={item.img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-1.5 text-[10px] font-semibold text-ink">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute -left-4 -top-3 flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface px-3 py-1.5 shadow-lg sm:-left-10 sm:px-3.5 sm:py-2"
          style={{ animation: "float-slow 5s ease-in-out infinite" }}
        >
          <Link2 size={13} className="text-lime" strokeWidth={2.5} />
          <span className="text-[10px] font-semibold text-ink sm:text-xs">
            stallio.shop/you
          </span>
        </div>

        <div
          className="absolute -right-3 bottom-16 flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-white shadow-lg sm:-right-8 sm:px-3.5 sm:py-2"
          style={{ animation: "float-slow 5s ease-in-out infinite 1.2s" }}
        >
          <span
            className="h-2 w-2 rounded-full bg-lime"
            style={{ animation: "pulse-dot 1.8s ease-in-out infinite" }}
            aria-hidden="true"
          />
          <span className="text-[10px] font-semibold sm:text-xs">
            New order
          </span>
        </div>
      </div>
    </div>
  );
}
