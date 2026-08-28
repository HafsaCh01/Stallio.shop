import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Container } from "./Container";
import { RouteDivider } from "./RouteDivider";
import { useReveal } from "@/hooks/use-reveal";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

type Section = { heading: string; paragraphs: string[] };

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
}) {
  const { t } = useTranslation("common");
  const { ref: heroRef, visible: heroVisible } = useReveal<HTMLDivElement>();
  const ids = useMemo(
    () => sections.map((_, i) => `section-${i + 1}`),
    [sections],
  );
  const activeId = useActiveSection(ids);

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet/20 blur-[110px]"
            style={{ animation: "drift-c 22s ease-in-out infinite" }}
          />
          <Container className="relative max-w-3xl py-12 sm:py-16">
            <div ref={heroRef}>
              <Link
                to="/"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-violet"
              >
                <ArrowLeft
                  size={16}
                  strokeWidth={2.25}
                  className="transition-transform duration-200 rtl:rotate-180 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5"
                />
                {t("legalPage.backToHome")}
              </Link>

              <h1
                data-visible={heroVisible}
                className="reveal-left mt-6 font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl"
              >
                {title}
              </h1>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-dim px-3 py-1 text-xs font-medium text-ink-faint">
                {t("legalPage.lastUpdated", { date: updated })}
              </div>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
                {intro}
              </p>
            </div>
          </Container>
        </section>

        <RouteDivider className="opacity-50" />

        <Container className="max-w-5xl py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
            <aside className="hidden lg:block">
              <nav
                aria-label={title}
                className="sticky top-28 flex flex-col gap-0.5 border-s border-ink/10 ps-4"
              >
                {sections.map((section, i) => {
                  const id = ids[i]!;
                  const active = activeId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => scrollToSection(id)}
                      className={cn(
                        "relative flex items-start gap-2 rounded-md py-1.5 text-start text-sm leading-snug transition-colors",
                        active
                          ? "font-semibold text-violet"
                          : "text-ink-faint hover:text-ink-soft",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -start-[17px] top-0 h-full w-0.5 rounded-full transition-colors duration-300",
                          active ? "bg-violet" : "bg-transparent",
                        )}
                      />
                      <span className="tabular-nums text-ink-faint/70">
                        {i + 1}.
                      </span>
                      <span>{section.heading}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <nav
              aria-label={title}
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:hidden"
            >
              {sections.map((section, i) => {
                const id = ids[i]!;
                const active = activeId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className={cn(
                      "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                      active
                        ? "border-violet bg-violet/10 text-violet"
                        : "border-ink/12 text-ink-faint",
                    )}
                  >
                    {i + 1}. {section.heading}
                  </button>
                );
              })}
            </nav>

            <div className="flex flex-col">
              {sections.map((section, i) => (
                <LegalSection
                  key={ids[i]}
                  id={ids[i]!}
                  index={i + 1}
                  heading={section.heading}
                  paragraphs={section.paragraphs}
                  isLast={i === sections.length - 1}
                />
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

function LegalSection({
  id,
  index,
  heading,
  paragraphs,
  isLast,
}: {
  id: string;
  index: number;
  heading: string;
  paragraphs: string[];
  isLast: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 py-7 first:pt-0",
        !isLast && "border-b border-ink/10",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet/10 text-xs font-semibold text-violet">
          {index}
        </span>
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
          {heading}
        </h2>
      </div>
      <div className="mt-3 flex flex-col gap-3 ps-10">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-sm leading-relaxed text-ink-soft sm:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
