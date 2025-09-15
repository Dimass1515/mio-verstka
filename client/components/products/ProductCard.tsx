import { useI18n } from "@/contexts/i18n";
import { useCart } from "@/contexts/cart";
import type { Product } from "@shared/api";
import { useState } from "react";

function formatPriceCents(cents: number, locale: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: locale === "fr" ? "EUR" : locale === "ru" ? "RUB" : "EUR" }).format(cents / 100);
}

export default function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useI18n();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const title = lang === "fr" ? product.title_fr : lang === "ru" ? product.title_ru : product.title_en;
  const price = formatPriceCents(product.priceCents, lang);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-square w-full overflow-hidden bg-brand-light/40">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 text-center">
        <h3 className="text-base font-bold tracking-tight text-slate-900">{title}</h3>
        <div className="mt-1 text-sm font-semibold text-brand">{price}</div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <label className="text-sm text-slate-700">
            Qty
            <select
              className="ml-2 rounded-full border px-3 py-1 text-sm hover:border-brand focus:outline-none"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Math.min(10, Number(e.target.value))))}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => addItem(product.id, qty)}
            className="inline-flex w-full items-center justify-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
            aria-live="polite"
          >
            {t("add")}
          </button>
        </div>
      </div>
    </div>
  );
}


