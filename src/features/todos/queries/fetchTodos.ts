import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const Input = z.object({
  search: z.string().optional(),
  userId: z.string(),
});
export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ search }) => {
  console.log("user is searching for todos", search);
  const todos = [
    { title: "buy bread", id: 1 },
    { title: "buy a turtle", id: 2 },
    { title: "buy a football team", id: 3 },
  ];
  return todos;
});
