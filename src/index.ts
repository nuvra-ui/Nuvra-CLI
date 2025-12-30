import { Command } from "commander";
import packageJson from "../package.json" with { type: "json" }

async function main() {
  const program = new Command()
    .name("Nuvra-CLI")
    .description("The CLI for the all in one UI-Library")
    .version(packageJson.version)

    program.parse()
}

main()