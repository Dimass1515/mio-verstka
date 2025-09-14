import { Input } from "@/components/ui/input";

const TOPICS = [
  { title: "Service client Starbucks Rewards/Carte Starbucks", href: "/faq" },
  { title: "Café en grain et Capsules Nespresso – Dolce Gusto", href: "https://www.starbucksathome.com/fr/nous-contacter" },
  { title: "PRESSE ET MEDIAS", href: "mailto:starbucksfrance@edelman.com" },
  { title: "Carrière", href: "https://candidate.quarksup.net/starbucks/announcements" },
  { title: "Nos Cafés", href: "/nos-cafes" },
  { title: "Starbucks Cartes Cadeaux", href: "/starbucks-cartes-cadeaux" },
  { title: "Conditions générales de la Carte Starbucks", href: "/rewards/ts-and-cs" },
  { title: "Starbucks Stories & News", href: "https://stories.starbucks.com/emea/" },
  { title: "Starbucks® Ready to Drink", href: "https://starbucksrtd.com/fr/" },
  { title: "Food Service", href: "https://solutions.starbucks.co.uk/" },
  { title: "Accessibilité", href: "/accessibilite" },
  { title: "Politique de Confidentialité", href: "/privacy-statement" },
];

export default function ServiceClientPage() {
  return (
    <div>
      <section className="border-b bg-brand-light">
        <div className="container py-12 md:py-16">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Bonjour, nous vous souhaitons la bienvenue chez Starbucks
          </h1>
          <p className="mt-3 max-w-3xl text-slate-700">
            Vous avez une question ? Consultez notre section FAQ pour trouver rapidement des réponses aux questions fréquemment posées. Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !
          </p>
          <div className="mt-6 max-w-xl">
            <Input placeholder="Rechercher" />
          </div>
        </div>
      </section>

      <section>
        <div className="container grid gap-6 py-10 md:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <a
              key={t.title}
              href={t.href}
              target={t.href.startsWith("http") || t.href.startsWith("mailto:") ? "_blank" : undefined}
              rel={t.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-2xl border p-5 transition hover:border-brand hover:shadow-sm"
            >
              <h3 className="font-semibold text-slate-900">{t.title}</h3>
              <span className="mt-2 inline-block text-sm font-semibold text-brand">Ouvrir</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
