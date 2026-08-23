import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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

type Section = { heading: string; body: string };

function TermsOfService() {
  const { t } = useTranslation(["legal", "common"]);
  const sections = t("terms.sections", { returnObjects: true }) as Section[];

  return (
    <LegalPage
      title={t("terms.title")}
      updated={t("common:legalPage.updatedDate")}
    >
      <p>{t("terms.intro")}</p>

      {sections.map((section) => (
        <LegalSection key={section.heading} heading={section.heading}>
          <p>{section.body}</p>
        </LegalSection>
      ))}
    </LegalPage>
  );
}
