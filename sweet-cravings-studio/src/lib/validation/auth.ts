import { z } from "zod";
import type { TFunction } from "i18next";

const usernamePattern = /^[a-zA-Z0-9_-]+$/;

export function createLoginSchema(t: TFunction<"auth">) {
  return z.object({
    email: z
      .string()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
    password: z.string().min(1, t("validation.passwordRequired")),
    remember: z.boolean().optional(),
  });
}
export type LoginValues = z.infer<ReturnType<typeof createLoginSchema>>;

export function createSignupSchema(t: TFunction<"auth">) {
  return z
    .object({
      shopName: z
        .string()
        .min(2, t("validation.shopNameMin"))
        .max(60, t("validation.shopNameMax")),
      username: z
        .string()
        .min(3, t("validation.usernameMin"))
        .max(30, t("validation.usernameMax"))
        .regex(usernamePattern, t("validation.usernamePattern")),
      email: z
        .string()
        .min(1, t("validation.emailRequired"))
        .email(t("validation.emailInvalid")),
      password: z
        .string()
        .min(8, t("validation.passwordMin8"))
        .regex(/[A-Z]/, t("validation.passwordUppercase"))
        .regex(/[0-9]/, t("validation.passwordNumber")),
      confirmPassword: z.string().min(1, t("validation.confirmPasswordRequired")),
      country: z.string().min(1, t("validation.countryRequired")),
      currency: z.string().min(1, t("validation.currencyRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordsDontMatch"),
      path: ["confirmPassword"],
    });
}
export type SignupValues = z.infer<ReturnType<typeof createSignupSchema>>;

export function createForgotPasswordSchema(t: TFunction<"auth">) {
  return z.object({
    email: z
      .string()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
  });
}
export type ForgotPasswordValues = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;

/** Rough 0-4 password strength score used by the signup strength meter. */
export function getPasswordStrength(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return Math.min(score, 4);
}
