import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const Input = z.object({
  todoTitle: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async (params, { session: { userId } }) => {
    const { todoTitle } = params;
    console.log("creating a todo with title", todoTitle);
    return "todo created";
  }
);
