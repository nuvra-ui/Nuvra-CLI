import typescript from "@rollup/plugin-typescript";

const config = [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "cjs",
      banner: "#!/usr/bin/env node",
      sourcemap: true,
    },
    plugins: [typescript()],
  },
];
export default config;
