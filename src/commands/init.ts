import axios from "axios";
import chalk from "chalk";
import inquirer from "inquirer";
import { Command } from "commander";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";

export const init = new Command()
  .name("init")
  .description(
    "Sets up the UI library with default configurations and prepares it for use."
  )
  .action(async () => {
    initLibary();
  });

async function initLibary() {
  async function getConfig() {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/nuvra-ui/Nuvra-UI/main/nuvra-ui.config.json"
      );
      return response.data;
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
  const config = await getConfig();
  const filePath = config["styles"]["global"]; //src/styles/global.css

  async function getCSSFile() {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/nuvra-ui/Nuvra-UI/main/" + filePath
      );
      return response.data;
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
  const cssFile = await getCSSFile();

  async function run() {
    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `Do you want to continue creating ${filePath}?`,
        default: "yes",
      },
    ]);

    if (!confirm) {
      console.log(chalk.red("Canceled"));
      process.exit(1);
    }
  }
  run();

  if (!existsSync(dirname(filePath))) {
    //src/styles
    mkdirSync(dirname(filePath));
  }
  writeFileSync(filePath, cssFile);
}
