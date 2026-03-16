import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { type LangType, type SupportedLng, supportedLngs } from "@/i18n";

/**
 * Syncs i18n language with saved/detected preference and sets document.documentElement.lang.
 * Call once at app root (e.g. in the component that renders the root Outlet).
 */

export function useLanguageSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const apply = (lng: LangType) => {
      document.documentElement.lang = supportedLngs.includes(lng) ? lng : "en";
    };

    apply(i18n.language as SupportedLng);
    i18n.on("languageChanged", apply);

    return () => {
      i18n.off("languageChanged", apply);
    };
  }, [i18n]);
}
