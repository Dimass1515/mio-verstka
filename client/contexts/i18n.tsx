import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type Lang = "fr" | "en" | "ru";

type Dict = Record<string, string>;

const DICTS: Record<Lang, Dict> = {
  fr: {
    nav_nos_cafes: "Nos cafés",
    nav_menu: "Menu",
    nav_rewards: "Rewards",
    nav_delivers: "Delivers",
    nav_service_client: "Service Client",
    nav_carriere: "Carrière",
    find_store: "Trouver un salon",
    sign_in: "Se connecter",
    home_title: "Starbucks®",
    home_sub: "Découvrez nos 2 nouvelles boissons.",
  },
  en: {
    nav_nos_cafes: "Stores",
    nav_menu: "Menu",
    nav_rewards: "Rewards",
    nav_delivers: "Delivers",
    nav_service_client: "Customer Service",
    nav_carriere: "Careers",
    find_store: "Find a store",
    sign_in: "Sign in",
    home_title: "Starbucks®",
    home_sub: "Discover our 2 new drinks.",
  },
  ru: {
    nav_nos_cafes: "Наши кафе",
    nav_menu: "Меню",
    nav_rewards: "Награды",
    nav_delivers: "Доставка",
    nav_service_client: "Сервис",
    nav_carriere: "Карьера",
    find_store: "Найти кафе",
    sign_in: "Войти",
    home_title: "Starbucks®",
    home_sub: "Откройте 2 новых напитка.",
  },
};

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  const t = useMemo(() => {
    const dict = DICTS[lang];
    return (key: string) => dict[key] ?? key;
  }, [lang]);
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export type { Lang };
