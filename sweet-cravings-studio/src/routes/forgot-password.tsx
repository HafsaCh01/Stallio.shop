import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AlertCircle,
  ArrowLeft,
  Loader2,
  Mail,
  MailCheck,
  Send,
} from "lucide-react";
import { AuthShell, AuthCard } from "@/components/stallio/auth/AuthShell";
import { AuthPromo } from "@/components/stallio/auth/AuthPromo";
import { FormField, FieldShell } from "@/components/stallio/auth/FormField";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/validation/auth";
import { cn } from "@/lib/utils";

const title = "Forgot Password: Stallio";
const description = "Reset the password for your Stallio account.";

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

/** Stand-in for a real API call until the backend is wired up. */
async function fakeSendResetLink(_values: ForgotPasswordValues) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return true;
}

const RESEND_COOLDOWN = 30;

function ForgotPassword() {
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [sentTo, setSentTo] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const startCooldown = () => {
    setCooldown(RESEND_COOLDOWN);
    const interval = window.setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          window.clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const onSubmit = async (values: ForgotPasswordValues) => {
    setFormError(null);
    setStatus("submitting");
    try {
      await fakeSendResetLink(values);
      setSentTo(values.email);
      setStatus("sent");
      startCooldown();
    } catch (err) {
      setStatus("idle");
      setFormError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setStatus("submitting");
    await fakeSendResetLink({ email: sentTo || getValues("email") });
    setStatus("sent");
    startCooldown();
  };

  return (
    <AuthShell mode="login" promo={<AuthPromo />}>
      <AuthCard
        eyebrow="Password reset"
        title={status === "sent" ? "Check your email" : "Forgot password"}
        subtitle={
          status === "sent"
            ? `We sent a reset link to ${sentTo}. Follow it to choose a new password.`
            : "Enter your account email. We will send a link to choose a new password."
        }
        footer={
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-1.5 font-semibold text-violet transition-colors hover:text-lime-dark"
          >
            <ArrowLeft size={14} strokeWidth={2.25} />
            Back to sign in
          </Link>
        }
      >
        {status === "sent" ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime/15 text-lime-dark">
              <MailCheck size={28} strokeWidth={2} />
            </span>
            <p className="max-w-xs text-sm text-ink-soft">
              Didn&rsquo;t get it? Check your spam folder, or send it again.
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-teal hover:text-teal disabled:pointer-events-none disabled:opacity-60"
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend link"}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
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

            <FormField id="email" label="Email" error={errors.email?.message}>
              <FieldShell
                icon={<Mail size={16} strokeWidth={2} />}
                error={Boolean(errors.email)}
              >
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
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
                "group relative mt-1 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet/40 hover:brightness-110 disabled:pointer-events-none disabled:opacity-70",
              )}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending&hellip;
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send Reset Link
                </>
              )}
            </button>
          </form>
        )}
      </AuthCard>
    </AuthShell>
  );
}
