import chalk from "chalk";
import { Command } from "commander";

export const hello = new Command()
  .name("hello")
  .description("Prints a hello message from Nuvra-UI (testing)")
  .action(async () => {
    console.log(chalk.green("Hello from Nuvra-UI!"));
  });
