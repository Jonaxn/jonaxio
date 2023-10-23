import { z } from "zod";

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim());

export const password = z
  .string()
  .min(6)
  .max(100)
  .transform((str) => str.trim());

export const name = z.string().min(2);

export const SignupInput = z.object({
  email,
  password,
  // name: z.string().optional(),
  name: name.optional(),
  terms: z
    .boolean()
    .refine((value) => value === true, {
      message: "You must accept terms and conditions",
    })
    .optional(),
});
