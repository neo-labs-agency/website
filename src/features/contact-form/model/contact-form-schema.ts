import { z } from "zod";

/** Translation keys used as error messages; display with t(message). */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "contact.form.errors.nameRequired")
    .min(2, "contact.form.errors.nameMin"),
  email: z
    .string()
    .min(1, "contact.form.errors.emailRequired")
    .email("contact.form.errors.emailInvalid"),
  message: z
    .string()
    .min(1, "contact.form.errors.descriptionRequired")
    .min(20, "contact.form.errors.descriptionMin"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
