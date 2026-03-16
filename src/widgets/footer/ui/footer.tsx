import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/utils";

export function Footer({ className }: { className?: string }) {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-border/50 bg-background/80 py-10 text-center text-muted-foreground",
        className
      )}
      role="contentinfo"
    >
      <p className="text-sm font-medium text-foreground/90">
        {t("footer.seeYouSoon")}
      </p>
      <p className="mt-2 text-sm">
        © {year} Neo Labs. {t("footer.allRightsReserved")}
      </p>
    </footer>
  );
}
