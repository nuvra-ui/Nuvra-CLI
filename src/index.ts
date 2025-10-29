import hello from "./commands/hello";
import addComponent from "./commands/addComponent";
import { Command } from "commander";

const program = new Command();

const subCommand = process.argv[2];

program
  .version("0.1.0")
  .description("Nuvra-UI CLI")
  .option("--add", "Add a component from Nuvra-UI to your project")
  .option("--hello", "Display a hello message from Nuvra-UI");

switch (subCommand) {
  case "add":
    addComponent();
    break;
  case "hello":
    hello();
    break;
  default:
    console.log("No valid subcommand found.");
}
