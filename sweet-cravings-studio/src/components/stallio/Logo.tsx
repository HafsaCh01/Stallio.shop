import { cn } from "@/lib/utils";
import logo from "@/assets/stallio-logo.png";

export function Logo({
  className,
  wordmarkClassName,
}: {
  className?: string;
  /** Override the wordmark's text color. Defaults to the theme-aware `text-ink`,
   * which only works on surfaces that flip with light/dark mode. Any surface with
   * a fixed background (e.g. the always-dark footer) must pass an explicit fixed
   * color here so the name stays visible in both themes. */
  wordmarkClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-end gap-2.5", className)}>
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        className="mb-0.5 h-9 w-9 shrink-0"
      />
      <span
        className={cn(
          "font-script text-[1.85rem] leading-[0.7] tracking-tight sm:text-4xl",
          wordmarkClassName ?? "text-ink",
        )}
      >
        Stallio
      </span>
    </span>
  );
}
