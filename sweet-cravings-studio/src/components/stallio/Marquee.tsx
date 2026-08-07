import { sellerCategories } from "@/lib/constants";

export function Marquee() {
  const items = [...sellerCategories, ...sellerCategories];

  return (
    <div className="overflow-hidden bg-[image:var(--gradient-brand)] py-1.5">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 text-[10px] font-medium uppercase tracking-wider text-ink sm:text-xs"
          >
            {item}
            <span aria-hidden="true" className="text-ink/40">
              &bull;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
