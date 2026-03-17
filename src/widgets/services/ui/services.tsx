import type { Service } from "@/entities/service";
import { useTranslation } from "react-i18next";
import { GlassCard } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

const serviceIds = ["web", "saas", "bots", "api", "staffing"] as const;
const icons: Record<(typeof serviceIds)[number], string> = {
  web: "🖥",
  saas: "☁️",
  bots: "🤖",
  api: "📊",
  staffing: "👥",
};

export function Services({ className }: { className?: string }) {
  const { t } = useTranslation();
  const servicesData: Service[] = serviceIds.map((id) => ({
    id,
    icon: icons[id],
    title: t(`services.${id}.title`),
    description: t(`services.${id}.description`),
  }));

  return (
    <section
      id="services"
      className={cn("relative scroll-mt-24 px-4 py-24", className)}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          {t("services.title")}{" "}
          <span style={{ wordBreak: "break-all" }} className="text-[#9D6BF7]">
            {t("services.brand")}
          </span>
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-white/70">
          {t("services.subtitle")}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((service, i) => (
            <GlassCard
              key={service.id}
              glow
              className="group flex flex-col items-start text-left transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <span
                className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              >
                {service.icon}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                {service.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
