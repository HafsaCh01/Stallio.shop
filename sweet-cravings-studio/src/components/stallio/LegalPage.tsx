import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Container } from "./Container";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <Navbar />
      <main className="flex-1">
        <Container className="max-w-3xl py-14 sm:py-20">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-ink-faint">Last updated: {updated}</p>
          <div className="prose-legal mt-8 flex flex-col gap-6 text-sm leading-relaxed text-ink-soft sm:text-base">
            {children}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
        {heading}
      </h2>
      <div className="mt-2 flex flex-col gap-3">{children}</div>
    </section>
  );
}
