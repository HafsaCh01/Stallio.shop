import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/stallio/Navbar";
import { Footer } from "@/components/stallio/Footer";
import { AboutHero } from "@/components/stallio/sections/about/AboutHero";
import { PhotoStrip } from "@/components/stallio/sections/about/PhotoStrip";
import { WhoWeServe } from "@/components/stallio/sections/about/WhoWeServe";
import { OurValues } from "@/components/stallio/sections/about/OurValues";
import { AboutCTA } from "@/components/stallio/sections/about/AboutCTA";

const title = "About Stallio: Your shop, one link away";
const description =
  "Stallio gives Instagram and WhatsApp sellers a real storefront, with no domain, no payment gateway, and no code required. Learn why we built it and who it's for.";

export const Route = createFileRoute("/about")({
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
  component: About,
});

function About() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <Navbar />
      <main className="flex-1">
        <AboutHero />
        <PhotoStrip />
        <WhoWeServe />
        <OurValues />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
}
