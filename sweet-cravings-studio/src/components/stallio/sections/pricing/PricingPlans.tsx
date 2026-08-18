import { useMemo, useState } from "react";
import { ArrowRight, Globe2, Zap, CalendarCheck, Sparkles } from "lucide-react";
import { Container } from "../../Container";
import { CTAButton } from "../../CTAButton";
import { RouteDivider } from "../../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type CountryOption = {
  code: string;
  name: string;
  flag: string;
  currency: string;
  rate: number;
  /** How many decimal-free digits to round to, for currencies with larger units. */
  round: number;
};

const countries: CountryOption[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    currency: "USD",
    rate: 1,
    round: 0,
  },
  {
    code: "PK",
    name: "Pakistan",
    flag: "🇵🇰",
    currency: "PKR",
    rate: 278,
    round: -1,
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    currency: "INR",
    rate: 83,
    round: 0,
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    currency: "AED",
    rate: 3.67,
    round: 0,
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    rate: 0.79,
    round: 0,
  },
  {
    code: "PH",
    name: "Philippines",
    flag: "🇵🇭",
    currency: "PHP",
    rate: 56,
    round: 0,
  },
  {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    currency: "NGN",
    rate: 1550,
    round: -2,
  },
  {
    code: "ID",
    name: "Indonesia",
    flag: "🇮🇩",
    currency: "IDR",
    rate: 15800,
    round: -2,
  },
];

const BASE_MONTHLY = 5;
const BASE_YEARLY = 50;

function formatEstimate(amount: number, round: number) {
  const factor = Math.pow(10, round);
  const rounded = Math.round(amount / factor) * factor;
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    rounded,
  );
}

export function PricingPlans() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [countryCode, setCountryCode] = useState("US");

  const country = useMemo(
    () => countries.find((c) => c.code === countryCode) ?? countries[0],
    [countryCode],
  );

  const monthlyEstimate = formatEstimate(
    BASE_MONTHLY * country.rate,
    country.round,
  );
  const yearlyEstimate = formatEstimate(
    BASE_YEARLY * country.rate,
    country.round,
  );
  const savingsUsd = BASE_MONTHLY * 12 - BASE_YEARLY;

  return (
    <section id="plans" className="relative overflow-hidden bg-paper-dim">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/3 top-0 h-72 w-72 rounded-full bg-teal/15 blur-[130px]"
        style={{ animation: "drift-b 24s ease-in-out infinite" }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            Choose billing
          </span>
          <h2 className="mt-3 font-display text-[1.9rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">
            Monthly or yearly, your choice
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            Preview local amounts by country. Subscriptions are charged in US
            dollars.
          </p>
        </div>

        <div
          ref={ref}
          className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[0.85fr_1fr_1fr] lg:gap-6"
        >
          {/* Country estimate */}
          <div
            data-visible={visible}
            className="reveal rounded-3xl border border-ink/10 bg-surface p-6 shadow-[0_24px_50px_-36px_rgba(0,0,0,0.9)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal/15 text-teal">
              <Globe2 size={19} strokeWidth={2.2} />
            </span>
            <h3 className="mt-4 font-display text-base font-semibold text-ink">
              Estimate your country
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              Search and select to see approximate prices in your currency on
              the plans.
            </p>

            <label className="sr-only" htmlFor="pricing-country">
              Select your country
            </label>
            <div className="relative mt-5">
              <select
                id="pricing-country"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="field-shell w-full cursor-pointer appearance-none rounded-xl border border-ink/12 bg-paper-dim py-3 pl-11 pr-9 text-sm font-medium text-ink outline-none transition-colors focus:border-teal/60"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base">
                {country.flag}
              </span>
              <ArrowRight
                size={14}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-ink-faint"
              />
            </div>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper-dim px-3 py-1.5 text-xs font-medium text-ink-soft">
              Estimated in {country.currency}
            </div>
          </div>

          {/* Monthly */}
          <div
            data-visible={visible}
            className="reveal rounded-3xl border border-ink/10 bg-surface p-6 shadow-[0_24px_50px_-36px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1"
            style={{ transitionDelay: "90ms" }}
          >
            <div className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper-dim px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
              <Zap size={12} className="text-amber" strokeWidth={2.5} />
              Monthly
            </div>

            <div className="mt-5 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                $5
              </span>
              <span className="text-sm font-medium text-ink-faint">/mo</span>
            </div>
            <p className="mt-1 text-xs text-ink-faint">
              After trial &middot; ≈ {country.currency} {monthlyEstimate}
              {country.code !== "US" && "/mo"}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Flexible billing. Cancel anytime from your account.
            </p>

            <CTAButton
              href="/signup"
              variant="outline"
              size="md"
              className="mt-6 w-full"
            >
              Start Monthly
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </CTAButton>
          </div>

          {/* Yearly */}
          <div
            data-visible={visible}
            className="reveal relative overflow-hidden rounded-3xl border border-violet/40 bg-surface p-6 shadow-[0_28px_60px_-30px_rgba(91,69,229,0.45)] transition-all duration-300 hover:-translate-y-1"
            style={{ transitionDelay: "170ms" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet/25 blur-[70px]"
            />
            <div className="relative flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-violet">
                <CalendarCheck size={12} strokeWidth={2.5} />
                Yearly
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[image:var(--gradient-brand)] px-2.5 py-1 text-[10px] font-semibold text-white">
                <Sparkles size={11} strokeWidth={2.5} />
                Save ${savingsUsd}
              </span>
            </div>

            <div className="relative mt-5 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                $50
              </span>
              <span className="text-sm font-medium text-ink-faint">/yr</span>
            </div>
            <p className="relative mt-1 text-xs text-ink-faint">
              After trial &middot; ≈ {country.currency} {yearlyEstimate}
              {country.code !== "US" && "/yr"}
            </p>

            <p className="relative mt-4 text-sm leading-relaxed text-ink-soft">
              Pay once per year. Best if you&apos;re committed to growing your
              shop.
            </p>

            <CTAButton
              href="/signup"
              size="md"
              className="relative mt-6 w-full"
            >
              Start Yearly
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </CTAButton>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-lg text-center text-xs leading-relaxed text-ink-faint">
          Local amounts are approximate and for reference only &mdash; your card
          is always charged in US dollars at checkout.
        </p>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}
