import { Command } from "commander";
import packageJson from "../package.json" with { type: "json" };
import { add } from "./commands/add.js";

async function main() {
  const program = new Command()
    .name("Nuvra-CLI")
    .description("The CLI for the all in one UI-Library")
    .version(packageJson.version);

  program.addCommand(add);

  program.parse();
}

main();
