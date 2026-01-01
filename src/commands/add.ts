import { Command } from "commander";
import * as p from "@clack/prompts";
import { getFile } from "../utils/getFile.js";

export const add = new Command()
  .name("add")
  .description("Add an component to your project")
  .action(addComponent);

async function addComponent() {
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

  group.component.forEach((item) => {
    console.log(registry[group.framework].find((c) => (c.name = item)));
  });
}
