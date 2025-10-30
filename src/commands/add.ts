import { Command } from "commander";
import fs from "fs";
import path from "path";

export const add = new Command()
  .name("add")
  .description("Add a component from Nuvra-UI to your project")
  .action(async () => {
    const positionalArgument = process.argv[3]; //e.g npx @nuvra-ui/nuvra-ui add <positionalArgument>
    const rootDir = path.resolve(); // e.g /home/joe/my-project
    const sourceDir = `${rootDir}/node_modules/@nuvra-ui/nuvra-ui/src/components/${positionalArgument}/${positionalArgument}.tsx`;
    const destDir = `${rootDir}/src/ui/${positionalArgument}`;

    console.log(`Searching for ${positionalArgument}-Component...`);

    fs.access(sourceDir, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(
          `Component ${positionalArgument} does not exist in Nuvra-UI`
        );
        process.exit();
      }
      console.log(`Component ${positionalArgument} found!`);
    });

    fs.mkdir(destDir, { recursive: true }, (err) => {
      if (err) throw err;
      console.log("Created Folder successfully!");

      fs.copyFile(sourceDir, `${destDir}/${positionalArgument}.tsx`, (err) => {
        if (err) throw err;
        console.log(
          `Added ${positionalArgument}-Component to ${destDir} successfully!`
        );
        process.exit();
      });
    });
  });
