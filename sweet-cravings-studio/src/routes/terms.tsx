import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/stallio/LegalPage";

const title = "Terms of Service: Stallio";
const description =
  "The terms that govern creating a store and selling on Stallio.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <LegalPage title="Terms of Service" updated="August 2026">
      <p>
        These Terms of Service govern your use of Stallio to create and run
        an online store. By creating a store, you agree to these terms.
      </p>

      <LegalSection heading="Using Stallio">
        <p>
          You must provide accurate information when creating your store and
          keep your account credentials secure. You are responsible for the
          products you list, the prices you set, and the orders you fulfill.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <p>
          Stores may not list illegal, counterfeit, or prohibited items, or
          be used to mislead customers. Stallio may suspend or remove stores
          that violate these terms.
        </p>
      </LegalSection>

      <LegalSection heading="Payments and orders">
        <p>
          Sellers are responsible for confirming and fulfilling orders placed
          through their store, and for honoring the payment methods, such as
          UPI or cash on delivery, that they offer to customers.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to the service">
        <p>
          Stallio may update features, pricing, or these terms from time to
          time. Continued use of the platform after an update means you
          accept the revised terms.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms can be sent through the contact options
          in the footer of this site.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
