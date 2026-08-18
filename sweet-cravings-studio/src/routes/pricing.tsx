import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/stallio/Navbar";
import { Footer } from "@/components/stallio/Footer";
import { PricingHero } from "@/components/stallio/sections/pricing/PricingHero";
import { PricingPlan } from "@/components/stallio/sections/pricing/PricingPlan";
import { PricingFAQ } from "@/components/stallio/sections/pricing/PricingFAQ";

const title = "Stallio Pricing: One plan, everything included";
const description =
  "Simple Stallio pricing: one free month, then $5/mo or $50/yr. Unlimited products, mobile storefront, order dashboard, and every tool included on both plans.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <Navbar />
      <main className="flex-1">
        <PricingHero />
        <PricingPlan />
        <PricingFAQ />
      </main>
      <Footer />
    </div>
  );
}
