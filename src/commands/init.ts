import { Command } from "commander";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";
import { confirmPromt } from "../prompts/confirm";
import { getData } from "../utils/getData";

export const init = new Command()
  .name("init")
  .description(
    "Sets up the UI library with default configurations and prepares it for use."
  )
  .action(async () => {
    initLibary();
  });

async function initLibary() {
  const config = await getData("/nuvra-ui.config.json");
  const filePath = config["styles"]["global"]; //src/styles/global.css
  const cssFile = await getData(filePath);

  confirmPromt(`Do you want to continue creating ${filePath}?`); //yes/no question

  if (!existsSync(dirname(filePath))) {
    //src/styles
    mkdirSync(dirname(filePath));
  }
  writeFileSync(filePath, cssFile);
}
