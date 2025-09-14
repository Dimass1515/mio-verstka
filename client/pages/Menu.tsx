import { Link } from "react-router-dom";

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
  return (
    <div>
      <section className="border-b bg-brand-light">
        <div className="container py-12 md:py-16">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Menu
          </h1>
          <p className="mt-3 max-w-prose text-slate-700">
            Découvrez nos boissons, pâtisseries et plus encore.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              to={c.href}
              key={c.title}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-brand">Voir</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      addItem(c.title, 1);
                    }}
                    className="rounded-full border px-3 py-1 text-xs font-semibold text-slate-800 hover:border-brand hover:text-brand"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
