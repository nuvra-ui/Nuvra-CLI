import { Command } from "commander";
import fs from "fs";

export const build = new Command()
  .name("build")
  .description("Convert a component file into a JSON file for the registry")
  .argument("[file]", "path to the component file to build")
  .action(async () => {
    await buildRegistryComponent();
  });

async function buildRegistryComponent() {
  if (!fs.existsSync("./registry")) {
    console.log("Creating registry folder...");
    fs.mkdirSync("./registry", { recursive: true });
  } else {
    console.log("Registry folder already exists.");
  }
}
