import { ContactForm } from "@/features/contact-form";
import { useTranslation } from "react-i18next";
import { GlassCard } from "@/shared/ui";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function Contact({ className }: { className?: string }) {
  const { t } = useTranslation();
  const socialLinks = [
    {
      href: "https://www.instagram.com/neo.labs.agency",
      icon: Instagram,
      labelKey: "contact.social.instagram" as const,
    },
    {
      href: "tel:+37444771769",
      icon: Phone,
      labelKey: "contact.social.phone" as const,
    },
    {
      href: "https://www.linkedin.com/company/neo-labs-agency",
      icon: Linkedin,
      labelKey: "contact.social.linkedin" as const,
    },
    {
      href: "mailto:neo.labs.agency@gmail.com",
      icon: Mail,
      labelKey: "contact.social.email" as const,
    },
  ];

  return (
    <section
      id="contact"
      className={cn("relative scroll-mt-24 px-4 py-24", className)}
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          {t("contact.title")}{" "}
          <span style={{ wordBreak: "break-all" }} className="text-[#9D6BF7]">
            {t("contact.brand")}
          </span>
        </h2>
        <p className="mx-auto mb-12 max-w-lg text-center text-white/70">
          {t("contact.subtitle")}
        </p>
        <GlassCard glow className="mb-12">
          <ContactForm />
        </GlassCard>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {socialLinks.map(({ href, icon: Icon, labelKey }) => (
            <a
              key={labelKey}
              target="_blank"
              href={href}
              aria-label={t(labelKey)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 backdrop-blur-sm transition-all hover:border-[#7B3FE4]/50 hover:bg-white/10 hover:text-[#9D6BF7]"
              rel="noreferrer"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
