import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const Input = z.object({
  search: z.string().optional(),
  userId: z.string(),
});
export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    // console.log("user is searching for todos", search);
    const todos = db.todo.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        done: true,
      },
    });
    return todos;
  }
);
