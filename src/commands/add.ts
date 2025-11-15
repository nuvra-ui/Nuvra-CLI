import { Command } from "commander";
import { readFileSync, copyFileSync, existsSync, mkdirSync } from "fs";

export const add = new Command()
  .name("add")
  .description("Add a component to your project")
  .argument("[component]", "name of the component to add")
  .action(async (component: string) => {
    await addComponent(component);
  });

async function addComponent(component: string) {
  const registry = JSON.parse(readFileSync("src/registry.json", "utf-8"));

  if (registry[component]) {
    const metaData = JSON.parse(
      readFileSync(`${registry[component].Path}/metadata.json`, "utf-8")
    );

    const componentPath = metaData.files[0].path;
    if (!existsSync(`src/ui/`)) {
      mkdirSync(`src/ui/`);
    }
    copyFileSync(componentPath, `src/ui/` + metaData.name + `.tsx`);
  } else {
    console.log(`Component "${component}" not found in registry.`);
  }
}
