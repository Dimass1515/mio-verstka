import { Link, NavLink } from "react-router-dom";
import { Globe, ShoppingBag } from "lucide-react";
import { useI18n } from "@/contexts/i18n";
import { useCart } from "@/contexts/cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const { count } = useCart();

  const NAV_ITEMS = [
    { label: t("nav_nos_cafes"), to: "/nos-cafes" },
    { label: t("nav_menu"), to: "/menu" },
    { label: t("nav_rewards"), to: "/rewards" },
    { label: t("nav_delivers"), to: "/delivers" },
    { label: t("nav_service_client"), to: "/service-client" },
    { label: t("nav_carriere"), to: "/carriere" },
  ];

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
            {t("find_store")}
          </Link>

          {/* Language selector with 7px padding */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-full border text-sm font-semibold text-slate-800 hover:border-brand hover:text-brand px-[7px] py-[7px]">
              <Globe className="h-4 w-4" /> {lang.toUpperCase()}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang("ru")}>Русский</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("fr")}>Français</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart with red badge */}
          <Link to="/cart" className="relative inline-flex items-center justify-center rounded-full border px-3 py-2 text-slate-800 hover:border-brand hover:text-brand">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold leading-none text-white">
                {count}
              </span>
            )}
          </Link>

          <Link
            to="/account/login"
            className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            {t("sign_in")}
          </Link>
        </div>
      </div>
    </header>
  );
}
