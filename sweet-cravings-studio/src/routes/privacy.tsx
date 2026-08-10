import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/stallio/LegalPage";

const title = "Privacy Policy: Stallio";
const description =
  "How Stallio collects, uses, and protects seller and buyer information across the platform.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" updated="August 2026">
      <p>
        This Privacy Policy explains what information Stallio collects from
        sellers and their customers, how it is used, and the choices
        available to you. By using Stallio, you agree to the practices
        described here.
      </p>

      <LegalSection heading="Information we collect">
        <p>
          When you create a store, we collect your name, contact details, and
          store information such as your catalog and pricing. When a customer
          places an order through your store, we collect the details needed
          to fulfill that order, including their name, contact number, and
          delivery address.
        </p>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <p>
          We use collected information to operate your storefront, process
          orders, provide the order dashboard, send account and order
          notifications, and improve the product. We do not sell seller or
          buyer data to third parties.
        </p>
      </LegalSection>

      <LegalSection heading="Data sharing">
        <p>
          Information is shared only where necessary to deliver the service,
          for example with payment or delivery partners you choose to use, or
          where required by law.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You can review, update, or delete your store information from your
          dashboard at any time. To request deletion of your account or data,
          contact us through the support channels listed on this site.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this policy can be sent through the contact options
          in the footer of this site.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
