import { useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export type ComboboxOption = {
  value: string;
  label: string;
};

type Props = {
  id?: string;
  icon: ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder: string;
  searchPlaceholder: string;
  emptyText?: string;
  error?: boolean;
};

/**
 * Searchable dropdown styled to match FieldShell (auth inputs) exactly.
 * Replaces native <select>, whose option list can't be themed and always
 * falls back to the OS/browser's own (light) styling.
 */
export function Combobox({
  id,
  icon,
  value,
  onChange,
  options,
  placeholder,
  searchPlaceholder,
  emptyText = "No matches.",
  error,
}: Props) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-invalid={error}
          className={cn(
            "field-shell group flex w-full items-center gap-2.5 rounded-xl border bg-paper px-3.5 py-2.5 text-left transition-[border-color,box-shadow,transform] duration-200 focus:outline-none focus-visible:-translate-y-px focus-visible:ring-2",
            error
              ? "border-coral/60 focus-visible:border-coral focus-visible:ring-coral/15"
              : open
                ? "-translate-y-px border-violet ring-2 ring-violet/15"
                : "border-ink/12 focus-visible:border-violet focus-visible:ring-violet/15",
          )}
        >
          <span
            className={cn(
              "shrink-0 transition-colors duration-200",
              error
                ? "text-coral"
                : "text-ink-faint group-hover:text-violet",
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
          <span
            className={cn(
              "flex-1 truncate text-sm",
              selected ? "text-ink" : "text-ink-faint",
            )}
          >
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            size={15}
            strokeWidth={2}
            className={cn(
              "shrink-0 text-ink-faint transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-xl border border-ink/12 bg-surface p-0 text-ink shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9)]"
      >
        <Command
          className="bg-transparent"
          filter={(itemValue, search) => {
            const option = options.find((o) => o.value === itemValue);
            const haystack = option?.label ?? itemValue;
            return haystack.toLowerCase().includes(search.toLowerCase())
              ? 1
              : 0;
          }}
        >
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-10 text-sm text-ink placeholder:text-ink-faint"
          />
          <CommandList className="max-h-56 p-1">
            <CommandEmpty className="py-6 text-center text-sm text-ink-faint">
              {emptyText}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className="cursor-pointer rounded-lg px-2.5 py-2 text-sm text-ink-soft data-[selected=true]:bg-violet/12 data-[selected=true]:text-ink"
                >
                  <Check
                    size={14}
                    strokeWidth={2.5}
                    className={cn(
                      "mr-2 shrink-0 text-violet",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
