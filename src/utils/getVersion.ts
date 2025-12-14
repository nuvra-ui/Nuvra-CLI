import { readFileSync } from "fs";

export const getVersion = (): string => {
  const pkg = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf-8")
  );
  return pkg.version;
};
