import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const variants = {
  primary:
    "bg-violet text-white shadow-lg shadow-violet/25 hover:shadow-xl hover:shadow-violet/40 hover:brightness-110",
  outline: "border border-ink/15 text-ink hover:border-teal hover:text-teal",
  ghost: "text-ink-soft hover:text-ink",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-base",
} as const;

export function CTAButton({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: Props) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-white/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:[animation:sheen_0.9s_ease-out]"
        />
      )}
      <span className="relative inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  );
}
