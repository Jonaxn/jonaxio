import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";
import { Role } from "~/types";
import { z } from "zod";
import { email, password } from "@/features/auth/schemas";
import db from "~/db";
export const input = z.object({
  email,
  password,
  name: z.string(),
});

export default resolver.pipe(resolver.zod(input), async ({ email, password, name }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim());
  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER", name: name },
    select: { id: true, name: true, email: true, role: true },
  });

  await ctx.session.$create({ userId: user.id, role: user.role as Role });
  return user;
});
