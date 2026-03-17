import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import useSWRMutation from "swr/mutation";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  contactFormSchema,
  type ContactFormValues,
} from "../model/contact-form-schema";
import { submitContactForm } from "../api/submit-contact-form";

export interface ContactFormProps {
  className?: string;
}

const SUBMIT_KEY = "contact-form-submit";

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none backdrop-blur-sm transition-colors focus:border-[#7B3FE4]/50 focus:ring-2 focus:ring-[#7B3FE4]/20";
const inputErrorClassName =
  "border-red-500/60 focus:border-red-500/50 focus:ring-red-500/20";

const FORM_ID: string = import.meta.env.VITE_FORM_ID ?? "";

export function ContactForm({ className }: ContactFormProps) {
  const { t } = useTranslation();
  const [success, setSuccess] = React.useState(false);
  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const {
    trigger,
    isMutating,
    error,
    reset: resetMutation,
  } = useSWRMutation(SUBMIT_KEY, submitContactForm);

  const onValidSubmit = React.useCallback(
    (formData: ContactFormValues) => {
      const payload = { ...formData, _form_id: FORM_ID };
      resetMutation();
      setSuccess(false);
      trigger(payload)
        .then(() => {
          reset();
          setSuccess(true);
        })
        .catch(() => {});
    },
    [trigger, reset, resetMutation]
  );

  return (
    <form
      onSubmit={handleFormSubmit(onValidSubmit)}
      className={cn("flex flex-col gap-5", className)}
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-white/80"
        >
          {t("contact.form.name")}
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={cn(inputClassName, errors.name && inputErrorClassName)}
          placeholder={t("contact.form.namePlaceholder")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          disabled={isMutating}
        />
        {errors.name?.message && (
          <p
            id="name-error"
            className="mt-1.5 text-sm text-red-400"
            role="alert"
          >
            {t(errors.name.message)}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-white/80"
        >
          {t("contact.form.email")}
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={cn(inputClassName, errors.email && inputErrorClassName)}
          placeholder={t("contact.form.emailPlaceholder")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={isMutating}
        />
        {errors.email?.message && (
          <p
            id="email-error"
            className="mt-1.5 text-sm text-red-400"
            role="alert"
          >
            {t(errors.email.message)}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-white/80"
        >
          {t("contact.form.description")}
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("message")}
          className={cn(
            inputClassName,
            "resize-none",
            errors.message && inputErrorClassName
          )}
          placeholder={t("contact.form.descriptionPlaceholder")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "description-error" : undefined}
          disabled={isMutating}
        />
        {errors.message?.message && (
          <p
            id="description-error"
            className="mt-1.5 text-sm text-red-400"
            role="alert"
          >
            {t(errors.message.message)}
          </p>
        )}
      </div>

      {success && (
        <p className="text-sm text-green-400" role="status">
          {t("contact.form.success")}
        </p>
      )}
      {error && (
        <p className="text-sm text-red-400" role="alert">
          {t("contact.form.error")}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={isMutating}
      >
        {isMutating ? t("contact.form.submitting") : t("contact.form.submit")}
      </Button>
    </form>
  );
}
