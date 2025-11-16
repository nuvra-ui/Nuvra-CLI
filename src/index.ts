import { Command } from "commander";
import { hello } from "./commands/hello";
import { add } from "./commands/add";
import { build } from "./commands/registry/build";
import { getVersion } from "./utils/getVersion";

const program = new Command()
  .name("nuvra-cli")
  .description("Nuvra-UI Command Line Interface")
  .version(getVersion(), "-v, --version", "output the current version");

program.addCommand(hello).addCommand(add).addCommand(build);

program.parse();
