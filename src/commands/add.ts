import { Command } from "commander";
import { log } from "@clack/prompts";
import { getFile } from "../utils/getFile.js";
import fs from "fs";
import path from "path";
import {
  registrySchema,
  type RegistryItem,
} from "../schemas/registrySchema.js";
import { getFileExtension } from "../utils/getFileExtension.js";
import { getAddGroup } from "../prompts/add.prompts.js";

export const add = new Command()
  .name("add")
  .description("Add an component to your project")
  .option("-p, --path [path]", "Set the working directory for the project")
  .action(async (options) => await addComponent(options));

async function addComponent(options: any) {
  const baseDir = options.path || process.cwd(); //check if working directory is given in the CLI options

  // 'todo' - more utils/functions for better readability (refactor)
  const optionPromt = await getAddGroup();

  const registry = await getFile("/registry.json");
  try {
    registrySchema.parse(registry);
    log.success("Successfully parsed registry.");
  } catch {
    log.error("Error parsing registry.");
  }

  if (!fs.existsSync(path.join(baseDir, "src", "ui"))) {
    log.error("Folder not found!");
    process.exit(0);
  } else {
    log.success(`Found component folder.`);
  }

  for (const item of optionPromt.component) {
    const componentData = registry[optionPromt.framework].find(
      (c: RegistryItem) => c.name === item,
    );

    if (!componentData) {
      log.error(`Component ${item} not found in registry.`);
      process.exit(0);
    }

    try {
      const fileContent = await getFile(componentData.files[0]["path"]);
      const fileExtension = getFileExtension(optionPromt.framework);

      fs.writeFileSync(
        path.join(baseDir, "src", "ui", componentData.name + fileExtension),
        fileContent,
      );
    } catch {
      log.error(`Error adding ${componentData.name} to your project.`);
    }
    log.success(`Successfully added ${componentData.name} to your project.`);
  }
}
