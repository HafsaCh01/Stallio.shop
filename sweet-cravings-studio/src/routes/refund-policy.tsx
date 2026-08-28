import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LegalPage } from "@/components/stallio/LegalPage";

const title = "Refund Policy: Stallio";
const description =
  "How refunds and cancellations are handled for subscription fees paid to Stallio.";

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

type Section = { heading: string; paragraphs: string[] };

function RefundPolicy() {
  const { t } = useTranslation(["legal", "common"]);
  const sections = t("refundPolicy.sections", {
    returnObjects: true,
  }) as Section[];

  return (
    <LegalPage
      title={t("refundPolicy.title")}
      updated={t("common:legalPage.updatedDate")}
      intro={t("refundPolicy.intro")}
      sections={sections}
    />
  );
}
