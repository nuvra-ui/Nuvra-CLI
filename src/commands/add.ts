import { Command } from "commander";
import * as p from "@clack/prompts";
import { log } from "@clack/prompts";
import { getFile } from "../utils/getFile.js";
import fs from "fs";
import {
  registrySchema,
  type RegistryItem,
} from "../schemas/registrySchema.js";
import { getFileExtension } from "../utils/getFileExtension.js";

export const add = new Command()
  .name("add")
  .description("Add an component to your project")
  .action(addComponent);

async function addComponent() {
  // 'todo' - more utils/functions for better readability (refactor)
  const group = await p.group(
    {
      framework: () =>
        p.select({
          message: "Pick the framework of your project.",
          options: [
            { value: "react", label: "React (tsx)" },
            { value: "vuejs", label: "Vue.js" },
          ],
        }),
      component: () =>
        p.multiselect({
          message: "Select the components you want to add to your project.",
          options: [
            { value: "Button", label: "Button" },
            { value: "Link", label: "Link" },
            { value: "Switch", label: "Switch" },
          ],
          required: true,
        }),
    },
    {
      onCancel: () => {
        p.cancel("Operation cancelled.");
        process.exit(0);
      },
    },
  );

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

  for (const item of group.component) {
    const componentData = registry[group.framework].find(
      (c: RegistryItem) => c.name === item,
    );

    if (!componentData) {
      log.error(`Component ${item} not found in registry.`);
      process.exit(0);
    }

    try {
      const fileContent = await getFile(componentData.files[0]["path"]);
      const fileExtension = getFileExtension(group.framework)

      fs.writeFileSync(
        `${process.cwd()}/src/commands/${componentData.name + fileExtension}`, // 'todo' - dynamic file ending (react/vue)
        fileContent,
      );
    } catch {
      log.error(`Error adding ${componentData.name} to your project.`);
    }
    log.success(`Successfully added ${componentData.name} to your project.`);
  }
}
