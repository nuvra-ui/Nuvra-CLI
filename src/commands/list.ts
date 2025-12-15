import { Command } from "commander";
import chalk from "chalk";
import apiClient from "../services/api-client";

export const list = new Command()
  .name("list")
  .description("List all Components available in the registry")
  .action(async () => {
    await listComponents();
  });

async function listComponents() {
  async function getComponents() {
    try {
      const response = await apiClient.get("/src/registry.json");
      return response.data;
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
  const registry = await getComponents();
  console.log(
    chalk.yellow(
      `The following ${chalk.underline(
        Object.keys(registry).length
      )} Components were found in the registry:`
    )
  );

  console.log(" ");
  Object.keys(registry).forEach((key) => {
    console.log(key);
  });
}
