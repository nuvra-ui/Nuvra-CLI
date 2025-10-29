import chalk from "chalk";
import fs from "fs";
import path from "path";

export default function addComponent() {
  const positionalArgument = process.argv[3]; //e.g npx @nuvra-ui/nuvra-ui add <positionalArgument>
  const rootDir = path.resolve(); // e.g /home/joe/my-project
  const sourceDir = `${rootDir}/node_modules/@nuvra-ui/nuvra-ui/src/components/${positionalArgument}/${positionalArgument}.tsx`;
  const destDir = `${rootDir}/src/ui/${positionalArgument}`;

  console.log(chalk.yellow(`Searching for ${positionalArgument}-Component...`));

  fs.access(sourceDir, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(
        chalk.red(`Component ${positionalArgument} does not exist in Nuvra-UI`)
      );
      process.exit();
    }
    console.log(chalk.green(`Component ${positionalArgument} found!`));
  });

  fs.mkdir(destDir, { recursive: true }, (err) => {
    if (err) throw err;
    console.log(chalk.green("Created Folder successfully!"));

    fs.copyFile(sourceDir, `${destDir}/${positionalArgument}.tsx`, (err) => {
      if (err) throw err;
      console.log(
        chalk.green(
          `Added ${positionalArgument}-Component to ${destDir} successfully!`
        )
      );
      process.exit();
    });
  });
}
