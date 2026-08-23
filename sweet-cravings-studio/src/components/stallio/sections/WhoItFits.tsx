import {
  AtSign,
  MessageCircle,
  Package,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../Container";
import { RouteDivider } from "../RouteDivider";
import { useReveal } from "@/hooks/use-reveal";

const personaIcons: LucideIcon[] = [AtSign, MessageCircle, Package, ShoppingBag];

type TranslatedPersona = { title: string; description: string; bestFor: string };

export function WhoItFits() {
  const { t } = useTranslation("home");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const personas = t("whoItFits.personas", {
    returnObjects: true,
  }) as TranslatedPersona[];

  return (
    <section id="who-its-for" className="relative bg-paper-dim">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            {t("whoItFits.eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {t("whoItFits.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-lg">
            {t("whoItFits.description")}
          </p>
        </div>

        <div
          ref={ref}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6"
        >
          {personas.map((persona, i) => (
            <div
              key={persona.title}
              data-visible={visible}
              className="reveal h-full"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <PersonaCard icon={personaIcons[i]!} {...persona} />
            </div>
          ))}
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function PersonaCard({
  icon: Icon,
  title,
  description,
  bestFor,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  bestFor: string;
}) {
  return (
    <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl bg-surface/60 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:bg-surface hover:shadow-[0_24px_50px_-30px_var(--violet)] sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[image:var(--gradient-brand)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30" />

      <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/15 text-lime transition-colors duration-300 group-hover:bg-[image:var(--gradient-brand)] group-hover:text-ink">
        <Icon size={22} strokeWidth={2} />
      </span>

      <div className="relative flex-1">
        <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {description}
        </p>
      </div>

      <span className="relative inline-flex w-fit items-center rounded-full bg-lime/15 px-3 py-1 text-xs font-medium text-lime">
        {bestFor}
      </span>
    </div>
  );
}
