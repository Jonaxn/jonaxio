import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";
import { Input } from "@mantine/core";

// const Input = z.object({
//   id: z.string(),
// });

export default resolver.pipe(
  // resolver.zod(Input),
  // resolver.authorize(),
  async () => {
    const todos = [
      { title: "buy bread", id: 1 },
      { title: "buy a turtle", id: 2 },
      { title: "buy a football team", id: 3 },
    ];
    return todos;
  }
);
