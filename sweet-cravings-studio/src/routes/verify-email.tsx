import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MailCheck,
} from "lucide-react";
import { AuthShell, AuthCard } from "@/components/stallio/auth/AuthShell";
import { AuthPromo } from "@/components/stallio/auth/AuthPromo";
import { cn } from "@/lib/utils";

const title = "Verify Your Email: Stallio";
const description = "Verify your email to activate your Stallio shop.";

type Search = { email?: string };

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): Search => {
    const result: Search = {};
    if (typeof search["email"] === "string") result.email = search["email"];
    return result;
  },
  component: VerifyEmail,
});

const CODE_LENGTH = 5;
const RESEND_COOLDOWN = 30;

/**
 * UI-only demo, no backend behind it. Code "00000" simulates the wrong-code
 * path; any other 5-digit code simulates a successful verification.
 */
function checkCode(code: string) {
  return code === "00000" ? "error" : "success";
}

function VerifyEmail() {
  const { t } = useTranslation("auth");
  const search = Route.useSearch();
  const email = search.email ?? "";

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [phase, setPhase] = useState<"entering" | "verifying" | "error" | "success">(
    "entering",
  );
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent">(
    "idle",
  );
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const startCooldown = () => {
    setCooldown(RESEND_COOLDOWN);
    const id = window.setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const runVerify = async (code: string) => {
    setPhase("verifying");
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (checkCode(code) === "error") {
      setPhase("error");
      window.setTimeout(() => {
        setDigits(Array(CODE_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
      }, 600);
    } else {
      setPhase("success");
    }
  };

  const handleChange = (index: number, raw: string) => {
    const char = raw.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (phase === "error") setPhase("entering");

    if (char && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (next.every((d) => d !== "")) {
      void runVerify(next.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!text) return;
    e.preventDefault();
    const next = Array(CODE_LENGTH).fill("");
    text
      .slice(0, CODE_LENGTH)
      .split("")
      .forEach((c, i) => {
        next[i] = c;
      });
    setDigits(next);
    if (phase === "error") setPhase("entering");
    const lastIndex = Math.min(text.length, CODE_LENGTH) - 1;
    inputRefs.current[Math.max(lastIndex, 0)]?.focus();
    if (text.length >= CODE_LENGTH) void runVerify(next.join(""));
  };

  const handleResend = async () => {
    if (cooldown > 0 || resendStatus === "sending") return;
    setResendStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setResendStatus("sent");
    setDigits(Array(CODE_LENGTH).fill(""));
    setPhase("entering");
    inputRefs.current[0]?.focus();
    startCooldown();
  };

  return (
    <AuthShell mode="signup" promo={<AuthPromo />}>
      {phase === "success" ? (
        <AuthCard
          eyebrow={t("verifyEmail.successEyebrow")}
          title={t("verifyEmail.successTitle")}
          subtitle={t("verifyEmail.successSubtitle")}
        >
          <div className="flex flex-col items-center gap-4 py-2 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime/15 text-lime-dark">
              <CheckCircle2 size={28} strokeWidth={2} />
            </span>
            <Link
              to="/login"
              className="group relative mt-1 inline-flex w-full max-w-xs items-center justify-center gap-2 overflow-hidden rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet/40 hover:brightness-110"
            >
              {t("verifyEmail.continueToLogin")}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </AuthCard>
      ) : (
        <AuthCard
          eyebrow={t("verifyEmail.eyebrow")}
          title={t("verifyEmail.title")}
          subtitle={
            email
              ? t("verifyEmail.subtitleWithEmail", { count: CODE_LENGTH, email })
              : t("verifyEmail.subtitleNoEmail", { count: CODE_LENGTH })
          }
          footer={
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-1.5 font-semibold text-violet transition-colors hover:text-lime-dark"
            >
              <ArrowLeft size={14} strokeWidth={2.25} />
              {t("verifyEmail.wrongEmail")}
            </Link>
          }
        >
          <div className="flex flex-col items-center gap-5">
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full",
                phase === "error"
                  ? "bg-coral/15 text-coral"
                  : "bg-violet/15 text-violet",
              )}
            >
              {phase === "error" ? (
                <AlertTriangle size={22} strokeWidth={2} />
              ) : (
                <MailCheck size={22} strokeWidth={2} />
              )}
            </span>

            <div className="flex items-center justify-center gap-2 sm:gap-2.5">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  disabled={phase === "verifying"}
                  aria-label={t("verifyEmail.digitLabel", { number: index + 1 })}
                  aria-invalid={phase === "error"}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={cn(
                    "h-12 w-10 rounded-xl border bg-paper text-center font-display text-xl font-semibold text-ink outline-none transition-all duration-150 sm:h-14 sm:w-12",
                    "focus:-translate-y-0.5 focus:ring-2",
                    phase === "error"
                      ? "border-coral/60 focus:border-coral focus:ring-coral/15"
                      : "border-ink/15 focus:border-violet focus:ring-violet/15",
                    phase === "verifying" && "opacity-60",
                  )}
                />
              ))}
            </div>

            <div className="flex min-h-[1.5rem] items-center justify-center text-center text-sm">
              {phase === "verifying" && (
                <span className="inline-flex items-center gap-1.5 text-ink-soft">
                  <Loader2 size={14} className="animate-spin" />
                  {t("verifyEmail.verifying")}
                </span>
              )}
              {phase === "error" && (
                <span className="inline-flex items-center gap-1.5 text-coral">
                  <AlertTriangle size={14} strokeWidth={2.25} />
                  {t("verifyEmail.codeIncorrect")}
                </span>
              )}
              {phase === "entering" && resendStatus === "sent" && (
                <span className="text-ink-soft">
                  {t("verifyEmail.codeResent")}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center gap-1.5 text-sm text-ink-soft">
              <span>{t("verifyEmail.noCodeReceived")}</span>
              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || resendStatus === "sending"}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-violet hover:text-violet disabled:pointer-events-none disabled:opacity-60"
              >
                {resendStatus === "sending" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    {t("verifyEmail.sending")}
                  </>
                ) : cooldown > 0 ? (
                  t("verifyEmail.resendIn", { seconds: cooldown })
                ) : (
                  t("verifyEmail.resendCode")
                )}
              </button>
            </div>
          </div>
        </AuthCard>
      )}
    </AuthShell>
  );
}
