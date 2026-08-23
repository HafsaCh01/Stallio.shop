import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/stallio/Navbar";
import { Footer } from "@/components/stallio/Footer";
import { SolutionsHero } from "@/components/stallio/sections/solutions/SolutionsHero";
import { SolutionsSwitcher } from "@/components/stallio/sections/solutions/SolutionsSwitcher";
import { SolutionsCTA } from "@/components/stallio/sections/solutions/SolutionsCTA";

const title = "Solutions by Business Type | Stallio";
const description =
  "See the exact problem Stallio solves for boutiques, home bakers, skincare brands, jewelry makers, thrift resellers, and craft sellers.";

export const Route = createFileRoute("/solutions")({
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
  component: Solutions,
});

function Solutions() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <Navbar />
      <main className="flex-1">
        <SolutionsHero />
        <SolutionsSwitcher />
        <SolutionsCTA />
      </main>
      <Footer />
    </div>
  );
}
