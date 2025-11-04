import { Command } from "commander";
import fs from "fs";
import path from "path";
import { componentSchema } from "../../schema/schema";

export const build = new Command()
  .name("build")
  .description("Convert a component file into a JSON file for the registry")
  .argument("[file]", "path to the component file to build")
  .action(async (file: string) => {
    await buildRegistryComponent(file);
  });

async function buildRegistryComponent(file: string) {
  //Check Registry Folder
  if (!fs.existsSync("./registry/")) {
    fs.mkdirSync("./registry/"), { recursive: true }; //Create Registry Folder
  }
  //Check Component Folder
  if (!fs.existsSync("./registry/" + path.parse(file).name)) {
    fs.mkdirSync("./registry/" + path.parse(file).name), { recursive: true }; //Create Component Folder
  }

  const componentData = {
    name: path.parse(file).name,
    description: "",
    author: "",
    version: "",
    tags: [],
    category: "",
  };

  fs.writeFileSync(
    `./registry/${path.parse(file).name}/${path.parse(file).name}.json`,
    JSON.stringify(componentSchema.parse(componentData), null, 2)
  );
}
