import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import { sendEmail } from "~/email/sendEmail";

const Input = z.object({
  to: z.string(),
  subject: z.string(),
  html: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async (input, { session: { userId } }) => {
    return sendEmail(input);
  }
);
