import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FieldShell } from "./FormField";
import { getPasswordStrength } from "@/lib/validation/auth";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean | undefined;
  showStrength?: boolean | undefined;
};

const strengthColors = ["bg-coral", "bg-coral", "bg-amber", "bg-teal", "bg-lime"];

export const PasswordField = forwardRef<HTMLInputElement, Props>(
  function PasswordField(
    { error, showStrength, className, value, onChange, ...props },
    ref,
  ) {
    const { t } = useTranslation("auth");
    const [visible, setVisible] = useState(false);
    const strength = showStrength
      ? getPasswordStrength(String(value ?? ""))
      : 0;
    const strengthLabels = t("passwordField.strength", {
      returnObjects: true,
    }) as string[];
    const label = strengthLabels[strength] ?? strengthLabels[0];
    const color = strengthColors[strength] ?? strengthColors[0];

    return (
      <div className="flex flex-col gap-2">
        <FieldShell icon={<Lock size={16} strokeWidth={2} />} error={error}>
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            value={value}
            onChange={onChange}
            className={cn(
              "w-full flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint",
              className,
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={
              visible
                ? t("passwordField.hidePassword")
                : t("passwordField.showPassword")
            }
            className="shrink-0 text-ink-faint transition-colors hover:text-ink"
          >
            {visible ? (
              <EyeOff size={16} strokeWidth={2} />
            ) : (
              <Eye size={16} strokeWidth={2} />
            )}
          </button>
        </FieldShell>

        {showStrength && String(value ?? "").length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex flex-1 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full bg-ink/10 transition-colors duration-300",
                    i < strength && color,
                  )}
                />
              ))}
            </div>
            <span className="w-16 shrink-0 text-right text-[11px] font-medium text-ink-faint">
              {label}
            </span>
          </div>
        )}
      </div>
    );
  },
);
