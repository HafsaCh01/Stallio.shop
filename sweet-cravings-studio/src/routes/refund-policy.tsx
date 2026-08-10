import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/stallio/LegalPage";

const title = "Refund Policy: Stallio";
const description =
  "How refunds and cancellations are handled for orders placed through a Stallio storefront.";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <LegalPage title="Refund Policy" updated="August 2026">
      <p>
        Stallio is a storefront platform. Each seller sets their own refund
        and cancellation terms for the products they sell, since Stallio does
        not manufacture or hold inventory itself.
      </p>

      <LegalSection heading="Seller-set refund terms">
        <p>
          Individual sellers may display their own return or refund window on
          their storefront. Where a seller has not stated a policy, contact
          the seller directly through the store's chat link to request a
          return, exchange, or refund.
        </p>
      </LegalSection>

      <LegalSection heading="Order cancellations">
        <p>
          Orders can typically be cancelled before a seller confirms them.
          Once an order is confirmed and dispatched, cancellation is at the
          seller's discretion.
        </p>
      </LegalSection>

      <LegalSection heading="Payment refunds">
        <p>
          For orders paid through UPI, an approved refund is returned to the
          original payment method. For cash on delivery orders, refunds are
          arranged directly with the seller.
        </p>
      </LegalSection>

      <LegalSection heading="Disputes">
        <p>
          If a seller and customer cannot resolve a refund request between
          themselves, contact Stallio support through the options in the
          footer of this site.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
