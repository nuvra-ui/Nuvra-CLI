var pkg = require("../package.json");

export const getVersion = (): string => {
  return pkg.version;
};
