import { Link2, ShieldCheck, Sparkles, Store } from "lucide-react";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod4 from "@/assets/prod-4.jpg";

const features = [
  {
    icon: Store,
    title: "Unlimited products",
    desc: "List your whole catalog, no per-item limits.",
  },
  {
    icon: Link2,
    title: "One shareable link",
    desc: "Drop it in your Instagram or WhatsApp bio.",
  },
  {
    icon: ShieldCheck,
    title: "No card required",
    desc: "Start free, upgrade only when you're ready.",
  },
];

export function AuthPromo() {
  return (
    <div className="max-w-lg">
      <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-dim px-4 py-1.5">
        <Sparkles size={14} className="text-lime" strokeWidth={2.5} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
          Stallio for sellers
        </span>
      </span>

      <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.6rem]">
        Your shop,{" "}
        <span className="bg-[image:var(--gradient-warm)] bg-clip-text text-transparent">
          one link away.
        </span>
      </h2>

      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        Turn your Instagram or WhatsApp page into a real online store: a mobile
        storefront, an order dashboard, and unlimited products, all from one
        shareable link.
      </p>

      <ul className="mt-8 flex flex-col gap-4">
        {features.map((f) => (
          <li key={f.title} className="flex items-start gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-paper-dim text-violet">
              <f.icon size={17} strokeWidth={2.25} />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight text-ink">
                {f.title}
              </p>
              <p className="text-sm text-ink-soft">{f.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-9 flex items-center gap-3">
        <div className="flex -space-x-3">
          {[prod1, prod2, prod4].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              aria-hidden="true"
              className="h-11 w-11 shrink-0 rounded-full border-2 border-paper object-cover shadow-sm"
            />
          ))}
        </div>
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-ink">1,000+ sellers</span> already
          shipping orders on Stallio
        </p>
      </div>
    </div>
  );
}
