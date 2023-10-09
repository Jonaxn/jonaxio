import { useParam } from "@blitzjs/next";

export const userStringParam = (name: string) => {
  let param = useParam(name, "string");
  return param;
};
