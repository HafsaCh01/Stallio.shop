import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Enter your name")
    .max(80, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  subject: z
    .string()
    .min(3, "Tell us what this is about")
    .max(120, "Subject is too long"),
  message: z
    .string()
    .min(10, "Message should be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ContactValues = z.infer<typeof contactSchema>;
