import { Link } from "react-router";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/utils";
import { Logo } from "@/shared/ui/icons/logo";
import i18n, { supportedLngs, type SupportedLng } from "@/i18n";
import {
  preloadServices,
  preloadAbout,
  preloadPortfolio,
  preloadContact,
} from "@/pages/home/ui/home-preloads";

const sectionPreloadByHash: Record<string, () => void> = {
  "#services": preloadServices,
  "#about": preloadAbout,
  "#portfolio": preloadPortfolio,
  "#contact": preloadContact,
};

export function Header({ className }: { className?: string }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "#services", label: t("nav.services") },
    { to: "#about", label: t("nav.about") },
    { to: "#portfolio", label: t("nav.portfolio") },
    { to: "#contact", label: t("nav.contact") },
  ];

  const setLng = (lng: SupportedLng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("neo-labs-lng", lng);
  };
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Escape key closes menu
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [closeMenu]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // Focus management: when opening, focus close button inside overlay; when closing, return focus to menu button
  useEffect(() => {
    if (!menuOpen) return;
    const timer = requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(timer);
  }, [menuOpen]);

  const handleMenuButtonClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
      menuButtonRef.current?.focus({ preventScroll: true });
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl",
        {
          "bottom-0 lg:bottom-auto": menuOpen,
        },
        className
      )}
      role="banner"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <Link
          to="/"
          className="flex items-center gap-x-1 text-lg font-semibold text-white transition-colors hover:text-[#9D6BF7] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#9D6BF7] rounded"
        >
          <Logo aria-hidden /> <span>{t("nav.brand")}</span>
        </Link>

        {/* Desktop nav: visible from md up */}
        <nav
          className="hidden items-center justify-end gap-4 sm:gap-6 md:flex md:gap-8"
          aria-label={t("nav.mainNav")}
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onMouseEnter={() => sectionPreloadByHash[to]?.()}
              onFocus={() => sectionPreloadByHash[to]?.()}
              className="rounded text-sm text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#9D6BF7]"
            >
              {label}
            </Link>
          ))}
          <Link
            to="#contact"
            onMouseEnter={() => preloadContact()}
            onFocus={() => preloadContact()}
            className="rounded-xl bg-[#7B3FE4] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#9D6BF7] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#9D6BF7]"
          >
            {t("nav.startProject")}
          </Link>
          <div className="ml-2 flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
            {supportedLngs.map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => setLng(lng)}
                className={cn(
                  "rounded-md px-2 py-1 text-xs font-medium uppercase transition-colors",
                  i18n.language === lng
                    ? "bg-[#7B3FE4] text-white"
                    : "text-white/70 hover:text-white"
                )}
                aria-label={lng}
              >
                {lng}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile menu button: visible below md */}
        <button
          ref={menuButtonRef}
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#9D6BF7] md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          onClick={handleMenuButtonClick}
        >
          {menuOpen ? (
            <X className="size-6" aria-hidden />
          ) : (
            <Menu className="size-6" aria-hidden />
          )}
        </button>
      </div>

      {/* Full-screen mobile menu overlay */}
      <div
        id={menuId}
        ref={menuRef}
        className={cn(
          "fixed inset-0 flex flex-col items-center justify-center gap-8 bg-[#0A0A0F]/98 backdrop-blur-xl px-4 pt-16 pb-12 md:hidden",
          "transition-[visibility,opacity] duration-200 ease-out",
          menuOpen
            ? "z-60 visible opacity-100"
            : "z-[-1] invisible opacity-0 pointer-events-none"
        )}
        aria-label={t("nav.mainNav")}
        aria-hidden={!menuOpen}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#9D6BF7]"
          aria-label={t("nav.closeMenu")}
          onClick={closeMenu}
        >
          <X className="size-6" aria-hidden />
        </button>
        <nav
          className="flex flex-col items-center gap-8"
          role="navigation"
          aria-label={t("nav.mobileMenu")}
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onMouseEnter={() => sectionPreloadByHash[to]?.()}
              onFocus={() => sectionPreloadByHash[to]?.()}
              onClick={closeMenu}
              className="text-2xl font-medium text-white/90 transition-colors hover:text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#9D6BF7] rounded"
            >
              {label}
            </Link>
          ))}
          <Link
            to="#contact"
            onMouseEnter={() => preloadContact()}
            onFocus={() => preloadContact()}
            onClick={closeMenu}
            className="rounded-xl bg-[#7B3FE4] px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-[#9D6BF7] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#9D6BF7]"
          >
            {t("nav.startProject")}
          </Link>
          <div className="flex items-center gap-2">
            {supportedLngs.map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => {
                  setLng(lng);
                  closeMenu();
                }}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium uppercase transition-colors",
                  i18n.language === lng
                    ? "bg-[#7B3FE4] text-white"
                    : "text-white/70 hover:text-white"
                )}
                aria-label={lng}
              >
                {lng}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
