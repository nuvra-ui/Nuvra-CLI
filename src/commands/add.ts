import { Command } from "commander";
import { multiselect, select } from "@clack/prompts";

export const add = new Command()
  .name("add")
  .description("Add an component to your project")
  .action(addComponent);

async function addComponent() {
  const framework = await select({
    message: "Pick the framework of your project.",
    options: [
      { value: "react", label: "React (tsx)" },
      { value: "vue", label: "Vue.js" },
    ],
  });
  const component = await multiselect({
    message: "Select the components you want to add to your project.",
    options: [
      { value: "button", label: "Button" },
      { value: "link", label: "Link" },
      { value: "switch", label: "Switch" },
    ],
    required: true,
  });

  const registry = getFi

}
