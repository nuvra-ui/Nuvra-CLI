import { Command } from "commander";
import { multiselect } from "@clack/prompts";

export const add = new Command()
  .name("add")
  .description("Add an component to your project")
  .action(addComponent)

async function addComponent() {
  const componentSelection = await multiselect({
    message: "Select the components you want to add to your project.",
    options: [
      { value: "button", label: "Button" },
      { value: "link", label: "Link" },
      { value: "switch", label: "Switch" },
    ],
    required: true
  });
}