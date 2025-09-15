import { useCart } from "@/contexts/cart";
import { useI18n } from "@/contexts/i18n";

function formatPriceCents(cents: number, locale: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: locale === "fr" ? "EUR" : locale === "ru" ? "RUB" : "EUR" }).format(cents / 100);
}

export default function CartPage() {
  const { cart, totalCents, updateItem, removeItem, clear } = useCart();
  const { lang } = useI18n();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Cart</h1>
      {(!cart || cart.items.length === 0) && (
        <p className="mt-6 text-slate-600">Votre panier est vide.</p>
      )}
      {cart && cart.items.length > 0 && (
        <div className="grid gap-8 md:grid-cols-[2fr,1fr] mt-6">
          <div className="space-y-4">
            {cart.items.map((it) => {
              const title = lang === "fr" ? it.product?.title_fr : lang === "ru" ? it.product?.title_ru : it.product?.title_en;
              const unit = formatPriceCents(it.product?.priceCents ?? 0, lang);
              const line = formatPriceCents((it.product?.priceCents ?? 0) * it.quantity, lang);
              return (
                <div key={it.id} className="flex items-center gap-4 rounded-xl border p-4">
                  {it.product?.imageUrl && (
                    <img src={it.product?.imageUrl} alt={title} className="h-20 w-28 rounded object-cover" />
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">{title}</div>
                    <div className="text-sm text-slate-600">{unit}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <select
                        className="rounded-md border px-2 py-1 text-sm"
                        value={it.quantity}
                        onChange={(e) => updateItem(it.id, Number(e.target.value))}
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <button className="text-sm text-red-600" onClick={() => removeItem(it.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold">{line}</div>
                </div>
              );
            })}
          </div>
          <aside className="space-y-4">
            <div className="rounded-xl border p-4">
              <div className="flex items-center justify-between text-slate-700">
                <span>Subtotal</span>
                <span>{formatPriceCents(totalCents, lang)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-slate-700">
                <span>Taxes</span>
                <span>{formatPriceCents(0, lang)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-slate-900 font-semibold">
                <span>Total</span>
                <span>{formatPriceCents(totalCents, lang)}</span>
              </div>
              <button className="mt-4 w-full rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
                Checkout
              </button>
              <button className="mt-2 w-full rounded-full border px-4 py-2 text-sm font-semibold hover:border-brand" onClick={() => clear()}>
                Clear
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}


