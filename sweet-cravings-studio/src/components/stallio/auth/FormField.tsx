import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label: string;
  error?: string | undefined;
  hint?: string | undefined;
  valid?: boolean | undefined;
  optional?: boolean | undefined;
  className?: string | undefined;
  children: ReactNode;
};

/** Labeled wrapper for a single auth-form field, with error/valid/hint feedback rows. */
export function FormField({
  id,
  label,
  error,
  hint,
  valid,
  optional,
  className,
  children,
}: Props) {
  const { t } = useTranslation("auth");
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label
          htmlFor={id}
          className="text-sm font-medium tracking-tight text-ink"
        >
          {label}
          {!optional && <span className="ml-0.5 text-coral">*</span>}
        </label>
        {optional && (
          <span className="text-xs text-ink-faint">
            {t("formField.optional")}
          </span>
        )}
      </div>

      {children}

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs font-medium text-coral"
        >
          <AlertCircle size={13} strokeWidth={2.25} className="shrink-0" />
          {error}
        </p>
      ) : valid ? (
        <p className="flex items-center gap-1.5 text-xs font-medium text-teal-dark">
          <CheckCircle2 size={13} strokeWidth={2.25} className="shrink-0" />
          {t("formField.looksGood")}
        </p>
      ) : hint ? (
        <p className="text-xs text-ink-faint">{hint}</p>
      ) : null}
    </div>
  );
}

/** Shared input chrome (icon + input) so every auth field looks consistent. */
export function FieldShell({
  icon,
  error,
  className,
  children,
}: {
  icon: ReactNode;
  error?: boolean | undefined;
  className?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "field-shell group flex items-center gap-2.5 rounded-xl border bg-paper px-3.5 py-2.5 transition-[border-color,box-shadow,transform] duration-200 focus-within:ring-2 focus-within:-translate-y-px",
        error
          ? "border-coral/60 focus-within:border-coral focus-within:ring-coral/15"
          : "border-ink/12 focus-within:border-violet focus-within:ring-violet/15",
        className,
      )}
    >
      <span
        className={cn(
          "shrink-0 transition-colors duration-200",
          error
            ? "text-coral"
            : "text-ink-faint group-focus-within:text-violet",
        )}
        aria-hidden="true"
      >
        {icon}
      </span>
      {children}
    </div>
  );
}
