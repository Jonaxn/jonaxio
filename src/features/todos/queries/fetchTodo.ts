import { resolver } from "@blitzjs/rpc";
export default resolver.pipe(resolver.authorize(), async () => {
  const todo = { title: "single todo" };

  return todo;
});
