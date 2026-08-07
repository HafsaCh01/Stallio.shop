import { Truck, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type PreviewProduct = {
  id: string;
  name: string;
  price: string;
  img: string;
  category: string;
  sizes?: string[];
  note?: string;
};

/**
 * Floating product card shown when a shopper hovers or taps a product
 * inside a phone mockup. Reused by the Hero and "Inside the box" sections
 * so both mockups pop the same way.
 */
export function ProductPreviewCard({
  product,
  onClose,
  className,
}: {
  product: PreviewProduct | null;
  onClose?: (() => void) | undefined;
  className?: string;
}) {
  const open = Boolean(product);

  return (
    <div
      aria-live="polite"
      className={cn(
        "z-30 mx-auto mt-5 w-full max-w-[320px] origin-top transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[260px] lg:max-w-none lg:-translate-y-1/2 lg:origin-left",
        open
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100 lg:[transform:translateY(-50%)_translateX(4.5rem)_rotateY(-10deg)]"
          : "pointer-events-none hidden translate-y-3 scale-95 opacity-0 lg:block lg:[transform:translateY(-50%)_translateX(0)_rotateY(-24deg)]",
        className,
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {product && (
        <div className="relative overflow-hidden rounded-3xl border border-violet/30 bg-surface p-4 shadow-[0_30px_70px_-30px_var(--violet)]">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product preview"
              className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-ink transition-colors hover:bg-black"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          )}

          <div className="h-32 w-full overflow-hidden rounded-2xl bg-paper-dim">
            <img
              src={product.img}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-lime">
            {product.category}
          </p>
          <h3 className="mt-1 truncate font-display text-base font-semibold text-ink">
            {product.name}
          </h3>
          <p className="mt-0.5 font-display text-lg font-semibold text-ink">
            {product.price}
          </p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="rounded-lg border border-ink/12 px-2 py-1 text-[10px] font-medium text-ink-soft"
                >
                  {size}
                </span>
              ))}
            </div>
          )}

          {product.note && (
            <p className="mt-3 flex items-center gap-1.5 text-[10px] text-ink-soft">
              <Truck size={12} className="shrink-0 text-teal" />
              {product.note}
            </p>
          )}

          <span className="mt-4 flex w-full items-center justify-center rounded-full bg-[image:var(--gradient-brand)] px-4 py-2 text-xs font-semibold text-ink">
            Add to cart
          </span>
        </div>
      )}
    </div>
  );
}
