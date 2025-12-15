import { Command } from "commander";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import axios from "axios";
import chalk from "chalk";
import apiClient from "../services/api-client";
import { getRegistry } from "../utils/getRegistry";
import { getMetadata } from "../utils/getMetadata";
import { getComponentFile } from "../utils/getComponentFile";

export const add = new Command()
  .name("add")
  .description("Add a component to your project")
  .argument("[component]", "name of the component to add")
  .action(async (component: string) => {
    await addComponent(component);
  });

async function addComponent(component: string) {
  const registry = await getRegistry();

  if (registry[component]) {
    const metaData = await getMetadata(registry[component].path);
    console.log(metaData);

    const componentFile = await getComponentFile(metaData.files[0].path);

    if (!existsSync(`src/ui/`)) {
      mkdirSync(`src/ui/`);
    }
    writeFileSync(`src/ui/` + metaData.name + `.tsx`, componentFile);
  } else {
    console.log(chalk.red(`Component "${component}" not found in registry.`));
  }
}
