import { Link, NavLink } from "react-router-dom";
import { Globe, Menu, ShoppingBag } from "lucide-react";
import { useI18n, type Lang } from "@/contexts/i18n";
import { useCart } from "@/contexts/cart";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const DESKTOP_NAV_ITEM_CLASS =
  "flex h-full items-center border-b-[4px] border-transparent px-2 text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-900 transition-colors hover:text-brand";

const MOBILE_NAV_ITEM_CLASS =
  "text-base font-semibold tracking-wide transition-colors hover:text-brand";

const LANGUAGE_OPTIONS: { code: Lang; label: string }[] = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const { count } = useCart();

  const NAV_ITEMS = [
    { label: t("nav_menu"), to: "/menu" },
    { label: t("nav_delivers"), to: "/delivers" },
    { label: t("nav_rewards"), to: "/rewards" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-[88px] w-full max-w-[1440px] items-center gap-6 px-6 md:px-10">
        <Link to="/" className="flex items-center" aria-label={t("home_title")}>
          <span className="sr-only">{t("home_title")}</span>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-lg font-black text-white shadow-[0_0_0_4px_rgba(0,98,65,0.15)]">
            <span className="-translate-y-[1px] tracking-[0.1em]">SB</span>
          </span>
        </Link>

        <nav className="hidden h-full items-stretch lg:flex" aria-label={t("nav_menu")}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(DESKTOP_NAV_ITEM_CLASS, isActive && "border-brand text-brand")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 transition-colors hover:border-brand hover:text-brand"
              aria-label="Sélection de la langue"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span>{lang.toUpperCase()}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              {LANGUAGE_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.code}
                  onSelect={() => setLang(option.code)}
                  className={cn(
                    "cursor-pointer font-semibold",
                    option.code === lang ? "text-brand" : "text-slate-700"
                  )}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-800 transition-colors hover:border-brand hover:text-brand"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">{t("cart")}</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold leading-none text-white">
                {count}
              </span>
            )}
          </Link>

          <Link
            to="/account/login"
            className="text-sm font-semibold text-slate-900 transition-colors hover:text-brand"
          >
            {t("sign_in")}
          </Link>
          <Link
            to="/account/create"
            className="inline-flex items-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            {t("join_now")}
          </Link>
        </div>

        <div className="ml-auto lg:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-800 transition-colors hover:border-slate-400 hover:text-brand">
              <Menu className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">{t("nav_menu")}</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 px-6">
              <SheetHeader className="items-start">
                <SheetTitle>{t("nav_menu")}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4 text-base font-semibold text-slate-900">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(MOBILE_NAV_ITEM_CLASS, isActive && "text-brand")
                      }
                    >
                      {item.label}
                    </NavLink>
                  </SheetClose>
                ))}
                <div className="h-px bg-slate-200" />
                <SheetClose asChild>
                  <Link
                    to="/account/login"
                    className="rounded-full border border-slate-300 px-4 py-2 text-base font-semibold text-slate-900 transition-colors hover:border-brand hover:text-brand"
                  >
                    {t("sign_in")}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/account/create"
                    className="rounded-full bg-brand px-4 py-2 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    {t("join_now")}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/cart"
                    className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 text-slate-800 transition-colors hover:border-brand hover:text-brand"
                  >
                    <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">{t("cart")}</span>
                    {count > 0 && (
                      <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold leading-none text-white">
                        {count}
                      </span>
                    )}
                  </Link>
                </SheetClose>
              </div>
              <div className="mt-8 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Langues
                </p>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => setLang(option.code)}
                      className={cn(
                        "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                        option.code === lang
                          ? "border-brand bg-brand/10 text-brand"
                          : "border-slate-300 text-slate-700 hover:border-brand hover:text-brand"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
