import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/stallio/Navbar";
import { Footer } from "@/components/stallio/Footer";
import { Hero } from "@/components/stallio/sections/Hero";
import { WhoItFits } from "@/components/stallio/sections/WhoItFits";
import { Comparison } from "@/components/stallio/sections/Comparison";
import { HowItWorks } from "@/components/stallio/sections/HowItWorks";
import { InsideTheBox } from "@/components/stallio/sections/InsideTheBox";
import { WhyItLands } from "@/components/stallio/sections/WhyItLands";
import { Testimonials } from "@/components/stallio/sections/Testimonials";
import { WhatsIncluded } from "@/components/stallio/sections/WhatsIncluded";
import { FinalCTA } from "@/components/stallio/sections/FinalCTA";

const title = "Stallio: Your shop, one link away";
const description =
  "Turn your Instagram or WhatsApp page into a real online store. Unlimited products, a mobile storefront, and an order dashboard from one shareable link.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhoItFits />
        <Comparison />
        <HowItWorks />
        <InsideTheBox />
        <WhyItLands />
        <Testimonials />
        <WhatsIncluded />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
