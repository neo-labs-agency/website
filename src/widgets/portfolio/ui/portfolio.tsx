import type { Project } from "@/entities/project";
import { useTranslation } from "react-i18next";
import { GlassCard } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { LazyImage } from "@/shared/ui/lazy-load-image";

const projectsConfig: (Omit<Project, "title" | "category"> & {
  translationKey: "finance" | "converter" | "bonds";
})[] = [
  {
    id: "1",
    translationKey: "finance",
    gradient: "from-[#7B3FE4]/40 to-[#5B21B6]/20",
    url: "https://abfinance.me",
    imgUrl:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    translationKey: "converter",
    gradient: "from-[#9D6BF7]/40 to-[#7B3FE4]/20",
    url: "https://converter-ad.vercel.app",
    imgUrl:
      "https://images.unsplash.com/photo-1611703523714-663c38cd9f55?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    translationKey: "bonds",
    gradient: "from-[#5B21B6]/40 to-[#7B3FE4]/20",
    url: "https://hyper-liquid-project-five.vercel.app/",
    imgUrl:
      "https://images.unsplash.com/photo-1609554496796-c345a5335ceb?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function Portfolio({ className }: { className?: string }) {
  const { t } = useTranslation();
  const projectsData: Project[] = projectsConfig.map(
    ({ translationKey, ...rest }) => ({
      ...rest,
      title: t(`portfolio.projects.${translationKey}.title`),
      category: t(`portfolio.projects.${translationKey}.category`),
    })
  );

  return (
    <section
      id="portfolio"
      className={cn("relative scroll-mt-24 px-4 py-24", className)}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          <span style={{ wordBreak: "break-all" }} className="text-[#9D6BF7]">
            {t("portfolio.title")}
          </span>
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-white/70">
          {t("portfolio.subtitle")}
        </p>
        <div className="grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <a
              target="_blank"
              key={project.id}
              href={project.url}
              rel="noreferrer"
            >
              <GlassCard
                glow
                className={cn(
                  "group flex h-full flex-col justify-start overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]",
                  "bg-linear-to-br",
                  project.gradient
                )}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <LazyImage
                  className="p-0 rounded-sm aspect-video shrink-0"
                  src={project.imgUrl}
                  alt={project.title}
                />

                <span className="my-2 text-sm font-medium text-white/70">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
              </GlassCard>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
