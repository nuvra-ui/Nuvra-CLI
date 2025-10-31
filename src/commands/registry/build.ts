import { Command } from "commander";

export const build = new Command()
  .name("build")
  .description("Convert a component file into a JSON file for the registry")
  .argument("[file]", "path to the component file to build")
  .action(async (file: string) => {
    await buildRegistryComponent(file);
  });

async function buildRegistryComponent(file: string) {
  console.log("Building: " + file);
}
