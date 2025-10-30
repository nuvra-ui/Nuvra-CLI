import { Command } from "commander";
import { hello } from "./commands/hello";
import { add } from "./commands/add";

const program = new Command()
  .name("nuvra-cli")
  .description("Nuvra-UI Command Line Interface")
  .version("0.1.0", "-v, --version", "output the current version");

program.addCommand(hello).addCommand(add);

program.parse();
