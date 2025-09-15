import { Link, NavLink } from "react-router-dom";
import { Globe, ShoppingBag, Menu } from "lucide-react";
import { useI18n } from "@/contexts/i18n";
import { useCart } from "@/contexts/cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const { count } = useCart();

  const NAV_ITEMS = [
    { label: t("nav_menu"), to: "/menu" },
    { label: t("nav_rewards"), to: "/rewards" },
    { label: t("gift_cards"), to: "/starbucks-cartes-cadeaux" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white font-black">SB</div>
          <span className="sr-only">Home</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold ml-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "px-1.5 py-1 transition-colors hover:text-brand-dark hover:underline underline-offset-8",
                  isActive
                    ? "text-brand underline decoration-brand decoration-2 underline-offset-8"
                    : "text-slate-900",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/account/create" className="hidden sm:inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold hover:border-brand">
            {t("join_now")}
          </Link>

          {/* Language selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-full border px-[7px] py-[7px] text-sm font-semibold text-slate-800 hover:border-brand hover:text-brand">
              <Globe className="h-4 w-4" /> {lang.toUpperCase()}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang("ru")}>Русский</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("fr")}>Français</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart with badge */}
          <Link
            to="/cart"
            className="relative inline-flex items-center justify-center rounded-full border px-3 py-2 text-slate-800 hover:border-brand hover:text-brand"
          >
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

        {/* Mobile burger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex items-center rounded-full border px-3 py-2">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => ["block text-base font-semibold", isActive ? "text-brand" : "text-slate-900"].join(" ")}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <div className="h-px bg-slate-200" />
                <Link to="/account/create" className="block rounded-full border px-4 py-2 text-sm font-semibold hover:border-brand">
                  {t("join_now")}
                </Link>
                <Link to="/account/login" className="block rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
                  {t("sign_in")}
                </Link>
                <Link to="/cart" className="relative inline-flex items-center justify-center rounded-full border px-3 py-2 text-slate-800 hover:border-brand hover:text-brand">
                  <ShoppingBag className="h-5 w-5" />
                  {count > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold leading-none text-white">
                      {count}
                    </span>
                  )}
                </Link>
                <div>
                  <div className="mb-2 text-xs font-semibold text-slate-500">Language</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex w-full items-center justify-between gap-2 rounded-full border px-3 py-2 text-sm font-semibold">
                      <span className="inline-flex items-center gap-2"><Globe className="h-4 w-4" /> {lang.toUpperCase()}</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setLang("ru")}>Р СѓСЃСЃРєРёР№</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLang("fr")}>FranГ§ais</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}



