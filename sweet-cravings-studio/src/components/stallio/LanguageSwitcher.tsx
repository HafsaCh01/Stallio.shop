import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { languageMeta, SUPPORTED_LANGUAGES } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Compact pill toggle used in the desktop navbar. Cycles between the two
 * supported languages and always shows the language you'd switch *to* is
 * not shown — instead it shows the current language, matching common
 * EN/ES toggle patterns (e.g. "EN" while in English, tap to get "ES").
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5 rounded-full border border-ink/12 bg-paper-dim p-0.5 text-ink-soft",
        className,
      )}
    >
      <Languages
        size={13}
        strokeWidth={2.25}
        className="ml-1.5 mr-0.5 shrink-0 text-ink-faint"
        aria-hidden="true"
      />
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          aria-label={languageMeta[lang].label}
          className={cn(
            "rounded-full px-2 py-1 text-[11px] font-semibold tracking-wide transition-all duration-200",
            language === lang
              ? "bg-paper text-ink shadow-sm"
              : "text-ink-faint hover:text-ink",
          )}
        >
          {languageMeta[lang].shortLabel}
        </button>
      ))}
    </div>
  );
}

/** Full-width variant used inside the mobile menu. */
export function LanguageSwitcherMobile({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "flex items-center gap-2 rounded-lg border border-ink/12 bg-paper-dim p-1",
        className,
      )}
    >
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
            language === lang
              ? "bg-paper text-ink shadow-sm"
              : "text-ink-soft hover:text-ink",
          )}
        >
          {languageMeta[lang].label}
        </button>
      ))}
    </div>
  );
}
