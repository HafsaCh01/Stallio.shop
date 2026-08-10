import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/stallio/Navbar";
import { Footer } from "@/components/stallio/Footer";
import { FeaturesHero } from "@/components/stallio/sections/features/FeaturesHero";
import { FeatureWalkthrough } from "@/components/stallio/sections/features/FeatureWalkthrough";
import { FeatureCapabilities } from "@/components/stallio/sections/features/FeatureCapabilities";
import { FeaturesFinalCTA } from "@/components/stallio/sections/features/FeaturesFinalCTA";

const title = "Stallio Features: Everything your storefront needs";
const description =
  "Explore every Stallio feature: unlimited product pages, built-in checkout with UPI and cash on delivery, a live order dashboard, and tools built for Instagram and WhatsApp sellers.";

export const Route = createFileRoute("/features")({
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
  component: Features,
});

function Features() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <Navbar />
      <main className="flex-1">
        <FeaturesHero />
        <FeatureWalkthrough />
        <FeatureCapabilities />
        <FeaturesFinalCTA />
      </main>
      <Footer />
    </div>
  );
}
