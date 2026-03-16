import { useTranslation } from "react-i18next";
import { GlassCard } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

export function About({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <section
      id="about"
      className={cn("relative scroll-mt-24 px-4 py-24", className)}
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          {t("about.title")} <span className="text-[#9D6BF7]">{t("about.brand")}</span>
        </h2>
        <GlassCard glow className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#7B3FE4]/20 blur-3xl"
            aria-hidden
          />
          <p
            className="relative text-lg leading-relaxed text-white/90"
            dangerouslySetInnerHTML={{ __html: t("about.description") }}
          />
        </GlassCard>
      </div>
    </section>
  );
}
