import { resolver } from "@blitzjs/rpc";
export default resolver.pipe(async () => {
  const todo = { title: "single todo" };

  return todo;
});
