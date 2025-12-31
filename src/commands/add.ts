import { Command } from "commander";
import { multiselect, select, isCancel, cancel } from "@clack/prompts";
import { getFile } from "../utils/getFile.js";

export const add = new Command()
  .name("add")
  .description("Add an component to your project")
  .action(addComponent);

async function addComponent() {
  const framework = await select({
    message: "Pick the framework of your project.",
    options: [
      { value: "react", label: "React (tsx)" },
      { value: "vuejs", label: "Vue.js" },
    ],
  });
  if (isCancel(framework)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const component = await multiselect({
    message: "Select the components you want to add to your project.",
    options: [
      { value: "Button", label: "Button" },
      { value: "Link", label: "Link" },
      { value: "Switch", label: "Switch" },
    ],
    required: true,
  });
  if (isCancel(component)) {
    cancel('Operation cancelled.')
    process.exit(0);
  }

  const registry = await getFile("/registry.json");

  component.forEach(name => {
    const content = registry[framework].find(
      (item: { name: string }) => item.name === name,
    );
    console.log(content)
  })
}
