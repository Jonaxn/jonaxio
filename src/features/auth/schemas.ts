import { z } from "zod";

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim());

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim());

export const SignupInput = z.object({
  email,
  password,
  name: z.string(),
  terms: z.boolean().refine((value) => value, {
    message: "You must accept terms and conditions",
  }),
});
