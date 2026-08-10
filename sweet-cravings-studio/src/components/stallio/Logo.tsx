import { cn } from "@/lib/utils";
import logo from "@/assets/stallio-logo.png";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        className="h-9 w-9 shrink-0"
      />
      <span className="font-script text-[1.85rem] leading-none tracking-tight text-ink sm:text-4xl">
        Stallio
      </span>
    </span>
  );
}
