import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/i18n";

const COLUMNS = [
  {
    title: "footer_about",
    links: [
      { text: "footer_about_link", to: "/apropos" },
      { text: "footer_stores", to: "/nos-cafes" },
      { text: "footer_stories", to: "https://stories.starbucks.com/emea/" },
      { text: "footer_rtd", to: "https://starbucksrtd.com/fr/" },
      { text: "footer_food_service", to: "https://solutions.starbucks.co.uk/" },
      { text: "footer_accessibility", to: "/accessibilite" },
    ],
  },
  {
    title: "footer_contact",
    links: [
      { text: "footer_career", to: "https://candidate.quarksup.net/starbucks/announcements" },
      { text: "footer_service_client", to: "/service-client" },
    ],
  },
  {
    title: "footer_impact",
    links: [{ text: "footer_responsibility", to: "/responsabilite" }],
  },
  {
    title: "footer_card",
    links: [
      { text: "footer_gift_cards", to: "/starbucks-cartes-cadeaux" },
      { text: "footer_card_terms", to: "/rewards/ts-and-cs" },
    ],
  },
];

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t bg-white">
      <div className="container py-12 grid gap-10 md:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-900">
              {t(col.title)}
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
                      {t(l.text)}
                    </a>
                  </li>
                ) : (
                  <li key={l.text}>
                    <Link
                      to={l.to}
                      className="text-slate-600 transition-colors hover:text-brand"
                    >
                      {t(l.text)}
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
          <p>© {new Date().getFullYear()} Starbucks Coffee Company. {t("footer_copyright")}</p>
          <div className="flex items-center gap-4">
            <Link to="/confidentialite" className="hover:text-brand">{t("footer_privacy")}</Link>
            <Link to="/cookies" className="hover:text-brand">{t("footer_cookies")}</Link>
            <Link to="/conditions" className="hover:text-brand">{t("footer_terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
