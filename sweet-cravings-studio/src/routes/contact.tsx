import { useMemo, useState, type ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Facebook,
  HelpCircle,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MessageSquareText,
  Pencil,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/stallio/Navbar";
import { Footer } from "@/components/stallio/Footer";
import { Container } from "@/components/stallio/Container";
import { CTAButton } from "@/components/stallio/CTAButton";
import { RouteDivider } from "@/components/stallio/RouteDivider";
import { FormField, FieldShell } from "@/components/stallio/auth/FormField";
import {
  createContactSchema,
  type ContactValues,
} from "@/lib/validation/contact";
import { siteConfig, socialLinks } from "@/lib/constants";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const title = "Contact Stallio";
const description =
  "Questions, partnership ideas, or something broken? Send Stallio a message and we'll point you in the right direction.";

export const Route = createFileRoute("/contact")({
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
  component: Contact,
});

function XLogo({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2H21.5l-7.5 8.573L22.75 22h-6.938l-5.43-7.09L4.13 22H.87l8.03-9.176L1.5 2h7.125l4.908 6.49L18.244 2Zm-1.214 18.17h1.833L7.05 3.72H5.08l11.95 16.45Z" />
    </svg>
  );
}

const socialMeta: Record<
  string,
  { icon: (props: { size?: number }) => ReactElement }
> = {
  Instagram: { icon: (props) => <Instagram {...props} strokeWidth={2} /> },
  Facebook: { icon: (props) => <Facebook {...props} strokeWidth={2} /> },
  LinkedIn: { icon: (props) => <Linkedin {...props} strokeWidth={2} /> },
  X: { icon: (props) => <XLogo {...props} /> },
};

const reassuranceIcons: LucideIcon[] = [Zap, ShieldCheck, HelpCircle];

function Contact() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <Navbar />
      <main className="flex-1">
        <ContactHero />
        <ContactFormSection />
        <SelfServeStrip />
      </main>
      <Footer />
    </div>
  );
}

function ContactHero() {
  const { t } = useTranslation("contact");
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet/25 blur-[140px]"
        style={{ animation: "drift-c 24s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-teal/15 blur-[130px]"
        style={{ animation: "drift-a 26s ease-in-out infinite" }}
      />

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div
          ref={ref}
          data-visible={visible}
          className="reveal mx-auto max-w-xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-dim px-4 py-1.5">
            <Sparkles size={14} className="text-lime" strokeWidth={2.5} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
              {t("hero.badge")}
            </span>
          </span>

          <h1 className="mt-6 font-display text-[2rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {t("hero.titleLead")}{" "}
            <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {t("hero.description")}
          </p>

          {/* Quick ways to reach us, inline — not a separate mirrored card */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="group flex items-center gap-2 rounded-full border border-ink/12 bg-paper-dim py-2 ps-2 pe-4 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-violet/40 hover:text-ink"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet/15 text-violet">
                <Mail size={12} strokeWidth={2.25} />
              </span>
              {siteConfig.contactEmail}
            </a>
            <div className="flex items-center gap-1.5">
              {socialLinks.map((social) => {
                const meta = socialMeta[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/12 bg-paper-dim text-ink-soft transition-colors duration-200 hover:border-violet/40 hover:text-ink"
                  >
                    {meta && meta.icon({ size: 15 })}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function ContactFormSection() {
  const { t, i18n } = useTranslation("contact");
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const contactSchema = useMemo(
    () => createContactSchema(t),
    [t, i18n.language],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  /** Stand-in for a real API call. No backend is wired up yet, so nothing
   * is actually emailed — this only simulates the network round trip so
   * the loading / success / error states are real and testable. */
  const fakeSendMessage = async (values: ContactValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (values.email.trim().toLowerCase() === "fail@stallio.shop") {
      throw new Error(t("form.sendFailedError"));
    }
    return true;
  };

  const onSubmit = async (values: ContactValues) => {
    setFormError(null);
    setStatus("submitting");
    try {
      await fakeSendMessage(values);
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setFormError(
        err instanceof Error ? err.message : t("form.genericError"),
      );
    }
  };

  const reassurances = (
    t("form.reassurances", { returnObjects: true }) as {
      title: string;
      text: string;
    }[]
  ).map((r, i) => ({ ...r, icon: reassuranceIcons[i]! }));

  return (
    <section className="relative overflow-hidden bg-paper-dim">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div
          ref={ref}
          data-visible={visible}
          className="reveal relative mx-auto w-full max-w-4xl"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-violet/10 blur-3xl"
          />

          <div className="grid overflow-hidden rounded-[2rem] border border-ink/10 bg-surface shadow-[0_50px_100px_-40px_rgba(0,0,0,0.5)] lg:grid-cols-[0.85fr_1.15fr]">
            {/* Info panel */}
            <div className="relative isolate flex flex-col justify-between gap-10 overflow-hidden border-b border-ink/10 bg-paper p-8 text-ink sm:border-b-0 sm:border-r sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet/20 blur-[100px]"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/12 bg-paper-dim px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  <Sparkles size={12} strokeWidth={2.5} className="text-violet" />
                  {t("form.letsTalk")}
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink sm:text-[1.75rem]">
                  {t("form.title")}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {t("form.description")}
                </p>
              </div>

              <ul className="relative flex flex-col gap-4">
                {reassurances.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet/12 text-violet">
                      <item.icon size={16} strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-faint">
                        {item.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form side */}
            <div>
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 px-8 py-16 text-center sm:px-12">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lime/15 text-lime-dark">
                  <CheckCircle2 size={30} strokeWidth={2} />
                </span>
                <p className="mt-1 font-display text-xl font-semibold text-ink">
                  {t("form.messageSent")}
                </p>
                <p className="max-w-xs text-sm text-ink-soft">
                  {t("form.thankYou")}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setStatus("idle");
                  }}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-violet hover:text-violet"
                >
                  {t("form.sendAnother")}
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 border-b border-ink/10 bg-paper-dim px-7 py-5 sm:px-9">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet/15 text-violet">
                    <MessageSquareText size={18} strokeWidth={2} />
                  </span>
                  <div>
                    <h2 className="font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
                      {t("form.sendAMessage")}
                    </h2>
                    <p className="text-xs text-ink-soft sm:text-sm">
                      {t("form.allFieldsRequired")}
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="flex flex-col gap-5 px-7 py-7 sm:px-9 sm:py-8"
                >
                  {formError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-ink"
                    >
                      <AlertCircle
                        size={17}
                        strokeWidth={2.25}
                        className="mt-0.5 shrink-0 text-coral"
                      />
                      <p>{formError}</p>
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      id="name"
                      label={t("form.name")}
                      error={errors.name?.message}
                    >
                      <FieldShell
                        icon={<User size={16} strokeWidth={2} />}
                        error={Boolean(errors.name)}
                      >
                        <input
                          id="name"
                          autoComplete="name"
                          placeholder={t("form.namePlaceholder")}
                          aria-invalid={Boolean(errors.name)}
                          className="w-full flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                          {...register("name")}
                        />
                      </FieldShell>
                    </FormField>

                    <FormField
                      id="email"
                      label={t("form.email")}
                      error={errors.email?.message}
                    >
                      <FieldShell
                        icon={<Mail size={16} strokeWidth={2} />}
                        error={Boolean(errors.email)}
                      >
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder={t("form.emailPlaceholder")}
                          aria-invalid={Boolean(errors.email)}
                          className="w-full flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                          {...register("email")}
                        />
                      </FieldShell>
                    </FormField>
                  </div>

                  <FormField
                    id="subject"
                    label={t("form.subject")}
                    error={errors.subject?.message}
                  >
                    <FieldShell
                      icon={<Pencil size={16} strokeWidth={2} />}
                      error={Boolean(errors.subject)}
                    >
                      <input
                        id="subject"
                        placeholder={t("form.subjectPlaceholder")}
                        aria-invalid={Boolean(errors.subject)}
                        className="w-full flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                        {...register("subject")}
                      />
                    </FieldShell>
                  </FormField>

                  <FormField
                    id="message"
                    label={t("form.message")}
                    error={errors.message?.message}
                  >
                    <div
                      className={cn(
                        "field-shell flex items-start gap-2.5 rounded-xl border bg-paper px-3.5 py-2.5 transition-[border-color,box-shadow,transform] duration-200 focus-within:-translate-y-px focus-within:ring-2",
                        errors.message
                          ? "border-coral/60 focus-within:border-coral focus-within:ring-coral/15"
                          : "border-ink/12 focus-within:border-violet focus-within:ring-violet/15",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 shrink-0",
                          errors.message ? "text-coral" : "text-ink-faint",
                        )}
                        aria-hidden="true"
                      >
                        <MessageSquareText size={16} strokeWidth={2} />
                      </span>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder={t("form.messagePlaceholder")}
                        aria-invalid={Boolean(errors.message)}
                        className="w-full flex-1 resize-none bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                        {...register("message")}
                      />
                    </div>
                  </FormField>

                  <div className="mt-1 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="order-2 flex items-center gap-1.5 text-xs text-ink-faint sm:order-1">
                      <Clock size={13} className="shrink-0 text-lime" />
                      {t("form.replyTime")}
                    </p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group relative order-1 inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet/40 hover:brightness-110 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 sm:order-2"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-white/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:[animation:sheen_0.9s_ease-out]"
                      />
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          {t("form.sending")}
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          {t("form.sendMessage")}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
            </div>
          </div>
        </div>
      </Container>

      <RouteDivider className="relative z-10" />
    </section>
  );
}

function SelfServeStrip() {
  const { t } = useTranslation("contact");
  return (
    <section className="relative overflow-hidden bg-paper">
      <Container className="flex flex-col items-center justify-between gap-6 py-10 sm:py-12 lg:flex-row">
        <div className="text-center lg:text-left">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lime sm:text-xs">
            {t("selfServe.eyebrow")}
          </span>
          <h2 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
            {t("selfServe.title")}
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {t("selfServe.description")}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row">
          <CTAButton href="/how-it-works" variant="outline" size="md">
            {t("selfServe.howItWorks")}
          </CTAButton>
          <CTAButton href="/features" size="md">
            {t("selfServe.features")}
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
