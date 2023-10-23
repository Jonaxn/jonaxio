import { useParam } from "@blitzjs/next";

export const useStringParam = (name: string) => {
  let param = useParam(name, "string");
  return param;
};
