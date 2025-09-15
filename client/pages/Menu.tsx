import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/i18n";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/products/ProductCard";
import type { PaginatedProducts } from "@shared/api";

const CATEGORIES = [
  {
    title: "Boissons",
    href: "/menu/boissons",
    image:
      "https://www.digitalassets.starbucks.eu/sites/starbucks-medialibrary/files/assets/a41e9afa349af0c2c601b0f5569b93a8_0.jpg",
  },
  {
    title: "Eau & Jus",
    href: "/menu/eau-jus",
    image:
      "https://www.digitalassets.starbucks.eu/sites/starbucks-medialibrary/files/assets/e02c0cb4c0095079f9f354b7d29a7963_1.jpg",
  },
  {
    title: "Pâtisseries & Desserts",
    href: "/menu/patisseries-desserts",
    image:
      "https://www.digitalassets.starbucks.eu/sites/starbucks-medialibrary/files/Viennoiserie-%26-Cakepop-Sub-Category.jpeg",
  },
  {
    title: "Gamme Salée",
    href: "/menu/gamme-salee",
    image:
      "https://www.digitalassets.starbucks.eu/sites/starbucks-medialibrary/files/Chicken-%26-Cheese-Sandwich.jpeg",
  },
  {
    title: "Starbucks® At Home",
    href: "/menu/starbucksr-at-home",
    image:
      "https://www.digitalassets.starbucks.eu/sites/starbucks-medialibrary/files/Espresso-Roast-250g-CHAT.jpeg",
  },
  {
    title: "Mugs & Tumblers",
    href: "/menu/mugs-tumblers",
    image:
      "https://www.digitalassets.starbucks.eu/sites/starbucks-medialibrary/files/Tumbler-made-from-Paper-Cups_2.jpeg",
  },
];

import { useCart } from "@/contexts/cart";

export default function MenuPage() {
  const { addItem } = useCart();
  const { t } = useI18n();
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      return (await res.json()) as PaginatedProducts;
    },
  });
  return (
    <div>
      <section className="border-b bg-brand-light">
        <div className="container py-12 md:py-16">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{t("nav_menu")}</h1>
          <p className="mt-3 max-w-prose text-slate-700">{t("home_sub")}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {(data?.items ?? []).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
