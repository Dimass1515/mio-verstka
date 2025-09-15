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
      join_now: "Créer un compte",
      gift_cards: "Cartes Cadeaux",
      home_title: "Starbucks®",
      home_sub: "Découvrez nos 2 nouvelles boissons.",
      cart: "Panier",
      add: "Ajouter",
      // Footer
      footer_about: "À propos",
      footer_about_link: "À propos",
      footer_stores: "Nos Cafés",
      footer_stories: "Starbucks Stories & News",
      footer_rtd: "Starbucks® Ready to Drink",
      footer_food_service: "Food Service",
      footer_accessibility: "Accessibilité",
      footer_contact: "Contact",
      footer_career: "Carrière",
      footer_service_client: "Service Client",
      footer_impact: "Impact Social et Environmental",
      footer_responsibility: "Responsabilité",
      footer_card: "Carte Starbucks",
      footer_gift_cards: "Starbucks Cartes Cadeaux",
      footer_card_terms: "Conditions générales de la Carte Starbucks",
      footer_copyright: "Tous droits réservés.",
      footer_privacy: "Confidentialité",
      footer_cookies: "Cookies",
      footer_terms: "Conditions d'utilisation",
      // Placeholder common
      placeholder_building: "Cette page est en cours de création. Dites-moi quoi ajouter et je la construirai immédiatement.",
      placeholder_back_home: "Retour à l'accueil",
      // Not Found
      not_found_title: "404",
      not_found_text: "Oups ! Page introuvable",
      // Account/Login/Create
      login_title: "Se connecter",
      login_email_label: "Saisissez votre adresse courriel",
      login_password_label: "Mot de passe",
      login_submit: "Se connecter",
      login_forgot: "Vous avez oublié votre mot de passe ?",
      login_no_account: "Pas de compte ?",
      login_create: "Créer un compte",
      create_title: "Créer un compte",
      first_name: "Prénom",
      last_name: "Nom",
      email: "Courriel",
      password: "Mot de passe",
      confirm_password: "Confirmer le mot de passe",
      create_submit: "Rejoignez les récompenses",
      // Cart
      cart_title: "Panier",
      cart_empty: "Votre panier est vide.",
      subtotal: "Sous-total",
      taxes: "Taxes",
      total: "Total",
      checkout: "Paiement",
      clear: "Vider",
      remove: "Supprimer",
      qty: "Qté",
      // Service Client
      sc_title: "Bonjour, nous vous souhaitons la bienvenue chez Starbucks",
      sc_desc: "Vous avez une question ? Consultez notre section FAQ pour trouver rapidement des réponses aux questions fréquemment posées. Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !",
      sc_search: "Rechercher",
      open: "Ouvrir",
      // Pagination and a11y small
      prev: "Précédent",
      next: "Suivant",
      more: "Plus",
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
      join_now: "Join now",
      gift_cards: "Gift Cards",
      home_title: "Starbucks®",
      home_sub: "Discover our 2 new drinks.",
      cart: "Cart",
      add: "Add",
      footer_about: "About",
      footer_about_link: "About",
      footer_stores: "Stores",
      footer_stories: "Starbucks Stories & News",
      footer_rtd: "Starbucks® Ready to Drink",
      footer_food_service: "Food Service",
      footer_accessibility: "Accessibility",
      footer_contact: "Contact",
      footer_career: "Careers",
      footer_service_client: "Customer Service",
      footer_impact: "Social & Environmental Impact",
      footer_responsibility: "Responsibility",
      footer_card: "Starbucks Card",
      footer_gift_cards: "Starbucks Gift Cards",
      footer_card_terms: "Starbucks Card Terms & Conditions",
      footer_copyright: "All rights reserved.",
      footer_privacy: "Privacy",
      footer_cookies: "Cookies",
      footer_terms: "Terms of Use",
      placeholder_building: "This page is under construction. Tell me what to add and I'll build it immediately.",
      placeholder_back_home: "Back to home",
      not_found_title: "404",
      not_found_text: "Oops! Page not found",
      login_title: "Sign in",
      login_email_label: "Enter your email address",
      login_password_label: "Password",
      login_submit: "Sign in",
      login_forgot: "Forgot your password?",
      login_no_account: "No account?",
      login_create: "Create an account",
      create_title: "Create an account",
      first_name: "First name",
      last_name: "Last name",
      email: "Email",
      password: "Password",
      confirm_password: "Confirm password",
      create_submit: "Join Rewards",
      cart_title: "Cart",
      cart_empty: "Your cart is empty.",
      subtotal: "Subtotal",
      taxes: "Taxes",
      total: "Total",
      checkout: "Checkout",
      clear: "Clear",
      remove: "Remove",
      qty: "Qty",
      sc_title: "Hello, welcome to Starbucks",
      sc_desc: "Have a question? Check our FAQ to quickly find answers to common questions. If you can't find what you're looking for, feel free to contact us. We're here to help!",
      sc_search: "Search",
      open: "Open",
      prev: "Previous",
      next: "Next",
      more: "More",
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
      join_now: "Зарегистрироваться",
      gift_cards: "Подарочные карты",
      home_title: "Starbucks®",
      home_sub: "Откройте 2 новых напитка.",
      cart: "Корзина",
      add: "Добавить",
      footer_about: "О компании",
      footer_about_link: "О компании",
      footer_stores: "Наши кафе",
      footer_stories: "Истории и новости Starbucks",
      footer_rtd: "Starbucks® Ready to Drink",
      footer_food_service: "Food Service",
      footer_accessibility: "Доступность",
      footer_contact: "Контакты",
      footer_career: "Карьера",
      footer_service_client: "Служба поддержки",
      footer_impact: "Социальное и экологическое влияние",
      footer_responsibility: "Ответственность",
      footer_card: "Карта Starbucks",
      footer_gift_cards: "Подарочные карты Starbucks",
      footer_card_terms: "Условия карты Starbucks",
      footer_copyright: "Все права защищены.",
      footer_privacy: "Конфиденциальность",
      footer_cookies: "Куки",
      footer_terms: "Условия использования",
      placeholder_building: "Эта страница в разработке. Скажите, что добавить, и я сделаю это сразу.",
      placeholder_back_home: "На главную",
      not_found_title: "404",
      not_found_text: "Упс! Страница не найдена",
      login_title: "Вход",
      login_email_label: "Введите адрес электронной почты",
      login_password_label: "Пароль",
      login_submit: "Войти",
      login_forgot: "Забыли пароль?",
      login_no_account: "Нет аккаунта?",
      login_create: "Создать аккаунт",
      create_title: "Создать аккаунт",
      first_name: "Имя",
      last_name: "Фамилия",
      email: "Email",
      password: "Пароль",
      confirm_password: "Подтвердите пароль",
      create_submit: "Присоединиться к Rewards",
      cart_title: "Корзина",
      cart_empty: "Ваша корзина пуста.",
      subtotal: "Промежуточный итог",
      taxes: "Налоги",
      total: "Итого",
      checkout: "Оформить заказ",
      clear: "Очистить",
      remove: "Удалить",
      qty: "Кол-во",
      sc_title: "Здравствуйте, добро пожаловать в Starbucks",
      sc_desc: "Есть вопрос? Загляните в FAQ, чтобы быстро найти ответы. Если не нашли нужного — свяжитесь с нами. Мы рады помочь!",
      sc_search: "Поиск",
      open: "Открыть",
      prev: "Назад",
      next: "Далее",
      more: "Ещё",
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
