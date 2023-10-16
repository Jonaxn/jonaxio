import { resolver } from "@blitzjs/rpc";
import { authenticateUser } from "@/utils/auth-utils";
import { z } from "zod";
import { email } from "@/features/auth/schemas";
import { Role } from "~/types";

export const Login = z.object({
  email,
  password: z.string(),
});
export default resolver.pipe(resolver.zod(Login), async (params, ctx) => {
  const { email, password } = params;
  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password);

  await ctx.session.$create({ userId: user.id, role: user.role as Role });

  return user;
});
