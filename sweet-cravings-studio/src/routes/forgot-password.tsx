import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Mail,
  MailCheck,
} from "lucide-react";
import { AuthShell, AuthCard } from "@/components/stallio/auth/AuthShell";
import { AuthPromo } from "@/components/stallio/auth/AuthPromo";
import { FormField, FieldShell } from "@/components/stallio/auth/FormField";
import {
  createForgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/validation/auth";
import { cn } from "@/lib/utils";

const title = "Forgot Password: Stallio";
const description = "Reset your Stallio account password.";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ForgotPassword,
});

const RESEND_SECONDS = 30;

function ForgotPassword() {
  const { t, i18n } = useTranslation("auth");
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">(
    "idle",
  );
  const [sentEmail, setSentEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const forgotPasswordSchema = useMemo(
    () => createForgotPasswordSchema(t),
    [t, i18n.language],
  );

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  /** Stand-in for a real API call until the backend is wired up. */
  const fakeSendReset = async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return true;
  };

  const onSubmit = async (values: ForgotPasswordValues) => {
    setFormError(null);
    setStatus("submitting");
    try {
      await fakeSendReset();
      setSentEmail(values.email);
      setStatus("sent");
      setCooldown(RESEND_SECONDS);
    } catch (err) {
      setStatus("idle");
      setFormError(
        err instanceof Error ? err.message : t("forgotPassword.genericError"),
      );
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    await fakeSendReset();
    setCooldown(RESEND_SECONDS);
  };

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = window.setInterval(() => {
      setCooldown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [cooldown]);

  return (
    <AuthShell mode="login" promo={<AuthPromo />}>
      <AuthCard
        eyebrow={t("forgotPassword.eyebrow")}
        title={
          status === "sent"
            ? t("forgotPassword.titleSent")
            : t("forgotPassword.title")
        }
        subtitle={
          status === "sent"
            ? t("forgotPassword.subtitleSent", { email: sentEmail })
            : t("forgotPassword.subtitle")
        }
        footer={
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 font-semibold text-violet transition-colors hover:text-lime-dark"
          >
            <ArrowLeft size={14} strokeWidth={2.25} />
            {t("forgotPassword.backToSignIn")}
          </Link>
        }
      >
        {status === "sent" ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime/15 text-lime-dark">
              <MailCheck size={28} strokeWidth={2} />
            </span>
            <p className="max-w-xs text-sm text-ink-soft">
              {t("forgotPassword.notReceived")}
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0}
              className="text-sm font-semibold text-violet transition-colors hover:text-lime-dark disabled:cursor-not-allowed disabled:text-ink-faint"
            >
              {cooldown > 0
                ? t("forgotPassword.resendIn", { seconds: cooldown })
                : t("forgotPassword.resendLink")}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="auth-form flex flex-col gap-5"
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

            <FormField
              id="email"
              label={t("forgotPassword.email")}
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
                  placeholder={t("forgotPassword.emailPlaceholder")}
                  aria-invalid={Boolean(errors.email)}
                  className="w-full flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                  {...register("email")}
                />
              </FieldShell>
            </FormField>

            <button
              type="submit"
              disabled={status === "submitting"}
              className={cn(
                "group relative mt-1 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet/40 hover:brightness-110 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70",
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-white/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:[animation:sheen_0.9s_ease-out]"
              />
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {t("forgotPassword.sending")}
                </>
              ) : (
                <>
                  {t("forgotPassword.sendResetLink")}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </form>
        )}
      </AuthCard>
    </AuthShell>
  );
}
