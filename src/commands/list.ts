import { Command } from "commander";
import chalk from "chalk";
import { getData } from "../utils/getData";

export const list = new Command()
  .name("list")
  .description("List all Components available in the registry")
  .action(async () => {
    await listComponents();
  });

async function listComponents() {
  const registry = await getData("/src/registry.json");

  console.log(
    chalk.yellow(
      `The following ${chalk.underline(
        Object.keys(registry).length,
      )} Components were found in the registry:`,
    ),
  );

  console.log(" ");
  Object.keys(registry).forEach((key) => {
    console.log(key);
  });
}
