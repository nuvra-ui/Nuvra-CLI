import { readFileSync } from "fs";

export const getVersion = (): string => {
  return JSON.parse(readFileSync("package.json", "utf-8")).version;
};
