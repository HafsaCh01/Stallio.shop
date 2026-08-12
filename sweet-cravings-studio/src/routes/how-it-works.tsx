import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/stallio/Navbar";
import { Footer } from "@/components/stallio/Footer";
import { HowItWorksHero } from "@/components/stallio/sections/how-it-works/HowItWorksHero";
import { TheFlow } from "@/components/stallio/sections/how-it-works/TheFlow";
import { ChannelShowcase } from "@/components/stallio/sections/how-it-works/ChannelShowcase";
import { LiveExperience } from "@/components/stallio/sections/how-it-works/LiveExperience";
import { QuickAnswers } from "@/components/stallio/sections/how-it-works/QuickAnswers";
import { HowItWorksFinalCTA } from "@/components/stallio/sections/how-it-works/HowItWorksFinalCTA";

const title = "How Stallio Works: Open, list, share";
const description =
  "See exactly how Stallio turns your Instagram or WhatsApp page into a real storefront: create your shop, add your products, then share one link everywhere buyers already find you.";

export const Route = createFileRoute("/how-it-works")({
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
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <Navbar />
      <main className="flex-1">
        <HowItWorksHero />
        <TheFlow />
        <ChannelShowcase />
        <LiveExperience />
        <QuickAnswers />
        <HowItWorksFinalCTA />
      </main>
      <Footer />
    </div>
  );
}
