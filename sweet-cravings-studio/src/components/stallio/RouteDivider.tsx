import { cn } from "@/lib/utils";

export function RouteDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-px w-full", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, var(--ink) 0 6px, transparent 6px 14px)",
        opacity: 0.14,
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "var(--teal)" }}
      />
    </div>
  );
}
