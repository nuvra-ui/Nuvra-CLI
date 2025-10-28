#!/usr/bin/env node

import hello from "../src/commands/hello.js"
import addComponent from "../src/commands/addComponent.js"

const subCommand = process.argv[2]

switch(subCommand) {
    case "add":
        addComponent()
        break
    default:
        console.log("No valid subcommand found.")                    
}