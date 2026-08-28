import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LegalPage } from "@/components/stallio/LegalPage";

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

type Section = { heading: string; paragraphs: string[] };

function PrivacyPolicy() {
  const { t } = useTranslation(["legal", "common"]);
  const sections = t("privacy.sections", {
    returnObjects: true,
  }) as Section[];

  return (
    <LegalPage
      title={t("privacy.title")}
      updated={t("common:legalPage.updatedDate")}
      intro={t("privacy.intro")}
      sections={sections}
    />
  );
}
