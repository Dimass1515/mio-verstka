import { Link, NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Nos cafés", to: "/nos-cafes" },
  { label: "Menu", to: "/menu" },
  { label: "Rewards", to: "/rewards" },
  { label: "Delivers", to: "/delivers" },
  { label: "Service Client", to: "/service-client" },
  { label: "Carrière", to: "/carriere" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white font-bold">★</div>
          <span className="sr-only">Accueil Starbucks France</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "transition-colors hover:text-brand-dark",
                  isActive ? "text-brand" : "text-slate-800",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/trouver-un-salon"
            className="hidden sm:inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold text-slate-800 hover:border-brand hover:text-brand"
          >
            Trouver un salon
          </Link>
          <Link
            to="/account/login"
            className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </header>
  );
}
