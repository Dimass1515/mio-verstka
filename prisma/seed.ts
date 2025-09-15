import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      slug: "caffe-latte",
      title_fr: "Caffè Latte",
      title_en: "Caffè Latte",
      title_ru: "Кофе Латте",
      description_fr: "Espresso doux et lait chaud crémeux.",
      description_en: "Smooth espresso with steamed creamy milk.",
      description_ru: "Мягкий эспрессо с паровым молоком.",
      priceCents: 390,
      imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772",
    },
    {
      slug: "caramel-macchiato",
      title_fr: "Caramel Macchiato",
      title_en: "Caramel Macchiato",
      title_ru: "Карамельный Макиато",
      description_fr: "Vanille, lait et nappage caramel.",
      description_en: "Vanilla, milk, and caramel drizzle.",
      description_ru: "Ваниль, молоко и карамельный соус.",
      priceCents: 470,
      imageUrl: "https://images.unsplash.com/photo-1512034400317-de97d7d6c3ed",
    },
    {
      slug: "cappuccino",
      title_fr: "Cappuccino",
      title_en: "Cappuccino",
      title_ru: "Капучино",
      description_fr: "Mousse généreuse et espresso.",
      description_en: "Rich foam and espresso.",
      description_ru: "Пышная пенка и эспрессо.",
      priceCents: 420,
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    },
    {
      slug: "americano",
      title_fr: "Caffè Americano",
      title_en: "Caffè Americano",
      title_ru: "Американо",
      description_fr: "Espresso allongé à l'eau chaude.",
      description_en: "Espresso with hot water.",
      description_ru: "Эспрессо с горячей водой.",
      priceCents: 320,
      imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
    },
    {
      slug: "mocha",
      title_fr: "Caffè Mocha",
      title_en: "Caffè Mocha",
      title_ru: "Мокко",
      description_fr: "Chocolat, espresso, lait.",
      description_en: "Chocolate, espresso, milk.",
      description_ru: "Шоколад, эспрессо, молоко.",
      priceCents: 480,
      imageUrl: "https://images.unsplash.com/photo-1432107294469-414527cb5c65",
    },
    {
      slug: "flat-white",
      title_fr: "Flat White",
      title_en: "Flat White",
      title_ru: "Флэт Уайт",
      description_fr: "Ristretto velouté et micro-mousse.",
      description_en: "Velvety ristretto and microfoam.",
      description_ru: "Шелковистый ристретто и микропена.",
      priceCents: 450,
      imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772",
    },
    {
      slug: "ice-latte",
      title_fr: "Iced Latte",
      title_en: "Iced Latte",
      title_ru: "Айсед Латте",
      description_fr: "Espresso sur glace et lait froid.",
      description_en: "Espresso over ice with cold milk.",
      description_ru: "Эспрессо со льдом и холодным молоком.",
      priceCents: 410,
      imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772",
    },
    {
      slug: "croissant",
      title_fr: "Croissant au beurre",
      title_en: "Butter Croissant",
      title_ru: "Круассан сливочный",
      description_fr: "Pâte feuilletée au beurre.",
      description_en: "Buttery flaky pastry.",
      description_ru: "Слоёная выпечка с маслом.",
      priceCents: 220,
      imageUrl: "https://images.unsplash.com/photo-1541782814458-7a3400b3c2a7",
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


