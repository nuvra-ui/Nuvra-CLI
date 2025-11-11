import { Command } from "commander";
import fs from "fs";
import path from "path";
import { componentSchema } from "../../schema/componentSchema";

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

  fs.writeFileSync(
    `${path.dirname(file)}/metadata.json`,
    JSON.stringify(componentSchema.parse(componentData), null, 2)
  );
  console.log(
    `metadata.json created successfully at ${path.dirname(file)}/metadata.json`
  );
}
