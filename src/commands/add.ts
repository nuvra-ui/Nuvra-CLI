import { Command } from "commander";
import { log } from "@clack/prompts";
import { getFile } from "../utils/getFile.js";
import fs from "fs";
import {
  registrySchema,
  type RegistryItem,
} from "../schemas/registrySchema.js";
import { getFileExtension } from "../utils/getFileExtension.js";
import { getAddGroup } from "../prompts/add.prompts.js";

export const add = new Command()
  .name("add")
  .description("Add an component to your project")
  .action(addComponent);

async function addComponent() {
  // 'todo' - more utils/functions for better readability (refactor)
  const options = await getAddGroup()

  const registry = await getFile("/registry.json");
  try {
    registrySchema.parse(registry);
    log.success("Successfully parsed registry.");
  } catch {
    log.error("Error parsing registry.");
  }

  if (!fs.existsSync(`${process.cwd()}/src/commands`)) {
    log.error("Folder not found!");
    process.exit(0);
  } else {
    log.success(`Found component folder.`);
  }

  for (const item of options.component) {
    const componentData = registry[options.framework].find(
      (c: RegistryItem) => c.name === item,
    );

    if (!componentData) {
      log.error(`Component ${item} not found in registry.`);
      process.exit(0);
    }

    try {
      const fileContent = await getFile(componentData.files[0]["path"]);
      const fileExtension = getFileExtension(options.framework);

      fs.writeFileSync(
        `${process.cwd()}/src/commands/${componentData.name + fileExtension}`,
        fileContent,
      );
    } catch {
      log.error(`Error adding ${componentData.name} to your project.`);
    }
    log.success(`Successfully added ${componentData.name} to your project.`);
  }
}
