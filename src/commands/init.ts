import chalk from "chalk";
import { Command } from "commander";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";
import apiClient from "../services/api-client";
import { confirmPromt } from "../prompts/confirm";

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
      const response = await apiClient.get("/nuvra-ui.config.json");
      return response.data;
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
  const config = await getConfig();
  const filePath = config["styles"]["global"]; //src/styles/global.css

  async function getCSSFile() {
    try {
      const response = await apiClient.get(filePath);
      return response.data;
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
  const cssFile = await getCSSFile();

  confirmPromt(`Do you want to continue creating ${filePath}?`); //yes/no question

  if (!existsSync(dirname(filePath))) {
    //src/styles
    mkdirSync(dirname(filePath));
  }
  writeFileSync(filePath, cssFile);
}
