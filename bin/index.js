#!/usr/bin/env node

import hello from "../src/commands/hello.js";
import addComponent from "../src/commands/addComponent.js";
import chalk from "chalk";

const subCommand = process.argv[2];

switch (subCommand) {
  case "add":
    addComponent();
    break;
  case "hello":
    hello();
    break;
  default:
    console.log(chalk.red("No valid subcommand found."));
}
