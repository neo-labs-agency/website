import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

const PARTICLE_COUNT = 60;

export function Hero({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <section
      className={cn(
        "relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-24",
        className
      )}
    >
      {/* Animated gradient mesh background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(123, 63, 228, 0.25) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(93, 33, 182, 0.15) 0%, transparent 50%), radial-gradient(ellipse 50% 30% at 20% 80%, rgba(123, 63, 228, 0.1) 0%, transparent 50%)",
        }}
      />
      {/* Floating particles / neural nodes */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#7B3FE4] opacity-40 animate-float"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              animationDelay: `${(i % 5) * 0.5}s`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          />
        ))}
      </div>
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(123,63,228,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123,63,228,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_40px_rgba(123,63,228,0.3)] sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="bg-linear-to-r from-white via-[#E4E4E7] to-[#9D6BF7] bg-clip-text text-transparent">
            {t("hero.title")}
          </span>
          <br />
          <span className="text-white" style={{ wordBreak: "break-all" }}>
            {t("hero.agency")}
          </span>
        </h1>
        <p className="mb-10 text-lg text-white/80 sm:text-xl md:text-2xl">
          {t("hero.tagline")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="#contact">{t("hero.startProject")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="#services">{t("hero.viewServices")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
