import { Command } from "commander";
import fs from "fs";
import path from "path";
import { componentSchema } from "../../schema/componentSchema";
import { registrySchema } from "../../schema/registrySchema";

export const build = new Command()
  .name("build")
  .description("Convert a component file into a JSON file for the registry")
  .argument("[file]", "path to the component file to build")
  .action(async (file: string) => {
    await buildRegistryComponent(file);
  });

async function buildRegistryComponent(file: string) {
  const componentData = {
    name: path.parse(file).name,
    description: "",
    author: "",
    version: "",
    tags: [],
    category: "",
    files: [
      {
        path: file,
      },
    ],
  };

  // Write component metadata.json
  fs.writeFileSync(
    `${path.dirname(file)}/metadata.json`,
    JSON.stringify(componentSchema.parse(componentData), null, 2)
  );

  // update/create registry.json
  let registryData = {};

  if (fs.existsSync("src/registry.json")) {
    registryData = JSON.parse(fs.readFileSync("src/registry.json", "utf-8"));
  }

  const updatedRegistry = {
    [path.parse(file).name]: {
      path:
        "src/" + path.relative("src", path.dirname(file)).replace(/\\/g, "/"),
    },
  };

  registryData = { ...registryData, ...updatedRegistry };

  //write registry.json
  fs.writeFileSync(
    `src/registry.json`,
    JSON.stringify(registrySchema.parse(registryData), null, 2)
  );
}
