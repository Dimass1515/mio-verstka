import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

type Lang = "fr" | "en" | "ru";

type Dict = Record<string, string>;

const resources: Record<Lang, { common: Dict }> = {
  fr: {
    common: {
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
      cart: "Panier",
      add: "Ajouter",
    },
  },
  en: {
    common: {
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
      cart: "Cart",
      add: "Add",
    },
  },
  ru: {
    common: {
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
      cart: "Корзина",
      add: "Добавить",
    },
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      ns: ["common"],
      defaultNS: "common",
      fallbackLng: "fr",
      supportedLngs: ["fr", "en", "ru"],
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
      },
      interpolation: { escapeValue: false },
    });
}

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { i18n: i18nextInstance, t } = useTranslation();
  const [lang, setLangState] = useState<Lang>((i18n.language as Lang) || "fr");

  const setLang = (l: Lang) => {
    i18nextInstance.changeLanguage(l);
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  useEffect(() => {
    const saved = (localStorage.getItem("lang") as Lang) || (i18n.language as Lang) || "fr";
    if (saved && saved !== lang) {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", lang);
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export type { Lang };
