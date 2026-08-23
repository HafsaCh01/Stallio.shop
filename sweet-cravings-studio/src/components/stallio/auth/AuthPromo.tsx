import { Link2, ShieldCheck, Sparkles, Store } from "lucide-react";
import { useTranslation } from "react-i18next";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod4 from "@/assets/prod-4.jpg";

const featureIcons = [Store, Link2, ShieldCheck];

type TranslatedFeature = { title: string; desc: string };

export function AuthPromo() {
  const { t } = useTranslation("auth");
  const features = t("promo.features", {
    returnObjects: true,
  }) as TranslatedFeature[];

  return (
    <div className="max-w-lg">
      <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-dim px-4 py-1.5">
        <Sparkles size={14} className="text-lime" strokeWidth={2.5} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
          {t("promo.badge")}
        </span>
      </span>

      <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.6rem]">
        {t("promo.titleLead")}{" "}
        <span className="bg-[image:var(--gradient-warm)] bg-clip-text text-transparent">
          {t("promo.titleHighlight")}
        </span>
      </h2>

      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        {t("promo.description")}
      </p>

      <ul className="mt-8 flex flex-col gap-4">
        {features.map((f, i) => {
          const Icon = featureIcons[i]!;
          return (
            <li key={f.title} className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-paper-dim text-violet">
                <Icon size={17} strokeWidth={2.25} />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-tight text-ink">
                  {f.title}
                </p>
                <p className="text-sm text-ink-soft">{f.desc}</p>
              </div>
            </li>
          );
        })}
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
          <span className="font-semibold text-ink">
            {t("promo.sellerCount")}
          </span>{" "}
          {t("promo.socialProof")}
        </p>
      </div>
    </div>
  );
}
