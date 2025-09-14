import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "À propos",
    links: [
      { text: "À propos", to: "/apropos" },
      { text: "Nos Cafés", to: "/nos-cafes" },
      { text: "Starbucks Stories & News", to: "https://stories.starbucks.com/emea/" },
      { text: "Starbucks® Ready to Drink", to: "https://starbucksrtd.com/fr/" },
      { text: "Food Service", to: "https://solutions.starbucks.co.uk/" },
      { text: "Accessibilité", to: "/accessibilite" },
    ],
  },
  {
    title: "Contact",
    links: [
      { text: "Carrière", to: "https://candidate.quarksup.net/starbucks/announcements" },
      { text: "Service Client", to: "/service-client" },
    ],
  },
  {
    title: "Impact Social et Environmental",
    links: [{ text: "Responsabilité", to: "/responsabilite" }],
  },
  {
    title: "Carte Starbucks",
    links: [
      { text: "Starbucks Cartes Cadeaux", to: "/starbucks-cartes-cadeaux" },
      { text: "Conditions générales de la Carte Starbucks", to: "/rewards/ts-and-cs" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-12 grid gap-10 md:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-900">
              {col.title}
            </h3>
            <ul className="space-y-3 text-sm">
              {col.links.map((l) => (
                l.to.startsWith("http") ? (
                  <li key={l.text}>
                    <a
                      href={l.to}
                      className="text-slate-600 transition-colors hover:text-brand"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {l.text}
                    </a>
                  </li>
                ) : (
                  <li key={l.text}>
                    <Link
                      to={l.to}
                      className="text-slate-600 transition-colors hover:text-brand"
                    >
                      {l.text}
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t bg-brand-light/60">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Starbucks Coffee Company. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link to="/confidentialite" className="hover:text-brand">Confidentialité</Link>
            <Link to="/cookies" className="hover:text-brand">Cookies</Link>
            <Link to="/conditions" className="hover:text-brand">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
