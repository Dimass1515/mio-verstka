import React, { useMemo, useState, useEffect } from "react";
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

// Loading skeleton component
function ProductSkeleton() {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="aspect-square w-full overflow-hidden bg-gray-200 animate-pulse"></div>
      <div className="flex flex-1 flex-col p-5 text-center">
        <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

// Optimized product card with memoization
const MemoizedProductCard = React.memo(ProductCard);

export default function MenuPage() {
  const { addItem } = useCart();
  const { t } = useI18n();

  // Optimized query with aggressive caching
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products", {
        headers: {
          'Cache-Control': 'max-age=300', // 5 minutes cache
        }
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      return (await res.json()) as PaginatedProducts;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
    cacheTime: 30 * 60 * 1000, // 30 minutes - keep in cache
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
    refetchOnWindowFocus: false, // Don't refetch when user switches tabs
    refetchOnMount: false, // Don't refetch if data exists in cache
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
        <div className="container py-10">
          {error && (
            <div className="text-center py-8">
              <p className="text-red-600">Ошибка загрузки продуктов. Попробуйте обновить страницу.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 px-4 py-2 bg-brand text-white rounded hover:bg-brand-dark"
              >
                Обновить
              </button>
            </div>
          )}
          
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {(data?.items ?? []).map((product) => (
                <MemoizedProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
