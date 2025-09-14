import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/i18n";

const HERO = {
  desktop:
    "https://www.starbucks.fr/sites/starbucks-fr-pwa/files/styles/c20_hero_623x386/public/2025-09/3577%20FR%20Autumn%2025%20Website%20Homepage%20C20-With-Green_623x384px_v01.jpg.webp?itok=n6iJNd1U",
  mobile:
    "https://www.starbucks.fr/sites/starbucks-fr-pwa/files/styles/c20_hero_mobile_767x190/public/2025-09/3577%20FR%20Autumn%2025%20Website%20Homepage%20C20-With-Green_623x384px_v01.jpg.webp?itok=c53LAt5F",
  alt: "Découvrez nos 2 nouvelles boissons",
};

const REWARDS_FEATURES = [
  {
    icon: "https://www.starbucks.fr/sites/starbucks-fr-pwa/files/styles/c09_items_list_192x192/public/2024-10/rewards-1_0_0.png.webp?itok=wAQlRUDZ",
    heading: "Un client fidèle, on le récompense",
    body: "1€ = 10 Étoiles ⭐",
  },
  {
    icon: "https://www.starbucks.fr/sites/starbucks-fr-pwa/files/styles/c09_items_list_192x192/public/2024-10/rewards-2_0_0.png.webp?itok=WXz1GAWW",
    heading: "Encore plus de récompenses",
    body: "Collectez les étoiles pour profiter gratuitement de boisson, nourriture ou produits dérivés !",
  },
  {
    icon: "https://www.starbucks.fr/sites/starbucks-fr-pwa/files/styles/c09_items_list_192x192/public/2024-10/rewards-3_0_0.png.webp?itok=bXxNNHqN",
    heading: "1500 Étoiles en un an = Niveau Gold",
    body: "Le niveau Gold donne accès à de nombreuses récompenses tout au long de l'année, y compris celles d'anniversaire !",
  },
];

const CAROUSEL = [
  {
    heading: "Une cup offerte avec Too Good To Go 💚",
    image:
      "https://www.starbucks.fr/sites/starbucks-fr-pwa/files/styles/rich_content_carousel_card/public/2025-09/Image%20banner%20in-app%20%281%29.png.webp?itok=EFeY_ork",
    cta: "Je découvre comment",
    href: "/article/366/une-cup-offerte-avec-too-good-to-go",
  },
  {
    heading: "Sauvegardez vos salons favoris 💚",
    image:
      "https://www.starbucks.fr/sites/starbucks-fr-pwa/files/styles/rich_content_carousel_card/public/2024-03/fave%20store%20main.png.webp?itok=ZSMsuxpJ",
    cta: "Découvrez comment",
    href: "/article/271/sauvegardez-vos-salons-favoris",
  },
  {
    heading: "Vos favoris, en livraison 🏍",
    image:
      "https://www.starbucks.fr/sites/starbucks-fr-pwa/files/styles/rich_content_carousel_card/public/2024-03/Starbucks%20Delivers.jpg.webp?itok=2Y5olX5f",
    cta: "Découvrez comment",
    href: "/article/281/vos-favoris-en-livraison",
  },
  {
    heading: "Votre Starbucks Rewards évolue",
    image:
      "https://www.starbucks.fr/sites/starbucks-fr-pwa/files/styles/rich_content_carousel_card/public/2025-03/3484%20FR%20MTR%20InApp%20-%20Announcement%20-%2003_Happening_Today%20-%20Push-Notificaiton_Android_1440x720px_v01.jpg.webp?itok=bCddCIZS",
    cta: "En savoir plus",
    href: "/article/396/votre-starbucks-rewards-evolue",
  },
];

const FEATURED = {
  desktop:
    "https://www.starbucks.fr/sites/starbucks-fr-pwa/files/styles/c22_featured_card_531x273/public/2025-05/3530_FR_AH_Rubicon_C22-Banner_727x373px_v02.jpg.webp?itok=26pNmOfE",
  mobile:
    "https://www.starbucks.fr/sites/starbucks-fr-pwa/files/styles/c22_featured_card_mobile_727x373/public/2025-05/3530_FR_AH_Rubicon_C22-Banner_727x373px_v02.jpg.webp?itok=YuUhNzjh",
  heading: "Désormais, votre gobelet se composte chez vous",
  body: "Gagnez du temps grâce au Click & Collect et cumulez vos étoiles. Commander n'aura jamais été aussi simple.",
  cta: { label: "En savoir plus", href: "/article/one-cup" },
};

export default function Index() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-brand-light">
        <div className="container grid items-center gap-8 py-8 md:grid-cols-2 md:py-16">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              {t("home_title")}
            </h1>
            <p className="mt-4 max-w-prose text-lg text-slate-700">
              {t("home_sub")}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                to="/rewards"
                className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
              >
                Plus d’infos
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-brand hover:text-brand"
              >
                Voir le menu
              </Link>
            </div>
          </div>
          <div className="order-1 aspect-[16/10] w-full overflow-hidden rounded-xl bg-white shadow md:order-2">
            <picture>
              <source media="(max-width: 767px)" srcSet={HERO.mobile} />
              <img
                src={HERO.desktop}
                alt={HERO.alt}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* Rewards features */}
      <section className="border-t bg-white">
        <div className="container py-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Dites bonjour à la facilité de commande, au choix infini et - oui,
            au café gratuit.
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {REWARDS_FEATURES.map((f) => (
              <div key={f.heading} className="flex gap-4 rounded-xl border p-4">
                <img src={f.icon} alt="" className="h-16 w-16 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">{f.heading}</h3>
                  <p className="mt-1 text-sm text-slate-600">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="border-t bg-brand-light/60">
        <div className="container py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Sélectionné pour vous
            </h2>
            <div className="hidden text-sm text-slate-600 md:block">
              Faites glisser pour voir plus
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-2 [scroll-snap-type:x_mandatory]">
            {CAROUSEL.map((c) => (
              <article
                key={c.heading}
                className="min-w-[280px] max-w-sm scroll-mx-4 scroll-snap-align-start rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
              >
                <img
                  src={c.image}
                  alt=""
                  className="h-40 w-full rounded-t-2xl object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{c.heading}</h3>
                  <Link
                    to={c.href}
                    className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
                  >
                    {c.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured card */}
      <section className="border-t bg-white">
        <div className="container grid items-center gap-8 py-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              {FEATURED.heading}
            </h2>
            <p className="mt-3 max-w-prose text-slate-700">{FEATURED.body}</p>
            <Link
              to={FEATURED.cta.href}
              className="mt-6 inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
            >
              {FEATURED.cta.label}
            </Link>
          </div>
          <div className="order-1 aspect-[16/10] w-full overflow-hidden rounded-xl bg-white shadow md:order-2">
            <picture>
              <source media="(max-width: 767px)" srcSet={FEATURED.mobile} />
              <img
                src={FEATURED.desktop}
                alt={FEATURED.heading}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </section>
    </div>
  );
}
