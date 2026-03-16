import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import hy from "@/locales/hy.json";

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  hy: { translation: hy },
};

export const supportedLngs = ["en", "ru", "hy"] as const;

export type LangType = (typeof supportedLngs)[number];

export type SupportedLng = (typeof supportedLngs)[number];

export function getSavedOrDetectedLng(): SupportedLng {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("neo-labs-lng");
  if (stored && supportedLngs.includes(stored as SupportedLng))
    return stored as SupportedLng;
  const browser = navigator.language.split("-")[0];
  if (supportedLngs.includes(browser as SupportedLng))
    return browser as SupportedLng;
  return "en";
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  supportedLngs: [...supportedLngs],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
