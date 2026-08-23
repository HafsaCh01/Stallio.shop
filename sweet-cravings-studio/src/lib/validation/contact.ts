import { z } from "zod";
import type { TFunction } from "i18next";

export function createContactSchema(t: TFunction<"contact">) {
  return z.object({
    name: z
      .string()
      .min(2, t("validation.nameMin"))
      .max(80, t("validation.nameMax")),
    email: z
      .string()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
    subject: z
      .string()
      .min(3, t("validation.subjectMin"))
      .max(120, t("validation.subjectMax")),
    message: z
      .string()
      .min(10, t("validation.messageMin"))
      .max(2000, t("validation.messageMax")),
  });
}

export type ContactValues = z.infer<ReturnType<typeof createContactSchema>>;
