import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";
import { Role } from "~/types";

import { email, password, SignupInput } from "@/features/auth/schemas";
import db from "~/db";
import { PrismaError } from "@/utils/blitz-utils";
import React from "react";
import EmailTemplateWelcome from "~/email/react-email/emails/welcome";
import { sendEmail } from "~/email/sendEmail";

export default resolver.pipe(resolver.zod(SignupInput), async ({ email, password, name }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim());
  try {
    const user = await db.user.create({
      data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER", name: name },
      select: { id: true, name: true, email: true, role: true },
    });

    if (user) {
      await sendEmail({
        to: user.email,
        subject: "Welcome to Jonax.io",
        react: React.createElement(EmailTemplateWelcome, { props: { name: user.name } }),
      });
    }
    await ctx.session.$create({ userId: user.id, role: user.role as Role });

    return user;
  } catch (e) {
    throw new PrismaError(e.message, e.code, e.meta);
  }
});
