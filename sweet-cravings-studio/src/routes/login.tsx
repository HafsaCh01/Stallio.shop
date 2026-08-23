import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
} from "lucide-react";
import { AuthShell, AuthCard } from "@/components/stallio/auth/AuthShell";
import { AuthPromo } from "@/components/stallio/auth/AuthPromo";
import { FormField, FieldShell } from "@/components/stallio/auth/FormField";
import { PasswordField } from "@/components/stallio/auth/PasswordField";
import { createLoginSchema, type LoginValues } from "@/lib/validation/auth";
import { useAuthNav } from "@/lib/auth-transition";
import { cn } from "@/lib/utils";

const title = "Log In: Stallio";
const description = "Sign in to your Stallio dashboard to manage your shop.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { created?: true } =>
    search["created"] === true ? { created: true } : {},
  component: Login,
});

function Login() {
  const { t, i18n } = useTranslation("auth");
  const navigate = useNavigate();
  const authNav = useAuthNav();
  const search = Route.useSearch();
  const created = search["created"];
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const loginSchema = useMemo(() => createLoginSchema(t), [t, i18n.language]);

  /** Stand-in for a real API call until the backend is wired up. */
  const fakeSignIn = async (values: LoginValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (values.email.trim().toLowerCase() === "fail@stallio.shop") {
      throw new Error(t("login.invalidCredentials"));
    }
    return true;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (values: LoginValues) => {
    setFormError(null);
    setStatus("submitting");
    try {
      await fakeSignIn(values);
      setStatus("success");
      window.setTimeout(() => {
        navigate({ to: "/" });
      }, 900);
    } catch (err) {
      setStatus("idle");
      setFormError(err instanceof Error ? err.message : t("login.genericError"));
    }
  };

  return (
    <AuthShell mode="login" promo={<AuthPromo />}>
      <AuthCard
        eyebrow={t("login.eyebrow")}
        title={t("login.title")}
        subtitle={t("login.subtitle")}
        footer={
          <>
            {t("login.newToStallio")}{" "}
            <Link
              to="/signup"
              onClick={authNav("/signup")}
              className="font-semibold text-violet transition-colors hover:text-lime-dark"
            >
              {t("login.createShop")}
            </Link>
          </>
        }
      >
        {created && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-lime/30 bg-lime/10 px-4 py-3 text-sm text-ink">
            <CheckCircle2
              size={17}
              strokeWidth={2.25}
              className="mt-0.5 shrink-0 text-lime-dark"
            />
            <p>{t("login.shopReady")}</p>
          </div>
        )}

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime/15 text-lime-dark">
              <CheckCircle2 size={28} strokeWidth={2} />
            </span>
            <p className="font-display text-lg font-semibold text-ink">
              {t("login.welcomeBack")}
            </p>
            <p className="text-sm text-ink-soft">{t("login.redirecting")}</p>
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
              label={t("login.email")}
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
                  placeholder={t("login.emailPlaceholder")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                  {...register("email")}
                />
              </FieldShell>
            </FormField>

            <FormField
              id="password"
              label={t("login.password")}
              error={errors.password?.message}
            >
              <div className="flex flex-col gap-1.5">
                <PasswordField
                  id="password"
                  autoComplete="current-password"
                  placeholder={t("login.passwordPlaceholder")}
                  error={Boolean(errors.password)}
                  aria-invalid={Boolean(errors.password)}
                  {...register("password")}
                />
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-violet transition-colors hover:text-lime-dark"
                  >
                    {t("login.forgotPassword")}
                  </Link>
                </div>
              </div>
            </FormField>

            <label className="flex select-none items-center gap-2 text-sm text-ink-soft">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-ink/25 text-violet accent-[var(--violet)] focus-visible:outline-none"
                {...register("remember")}
              />
              {t("login.rememberMe")}
            </label>

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
                  {t("login.signingIn")}
                </>
              ) : (
                <>
                  {t("login.signIn")}
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
