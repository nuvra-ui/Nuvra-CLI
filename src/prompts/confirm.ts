import chalk from "chalk";
import inquirer from "inquirer";

export async function confirmPromt(message: string) {
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: message,
      default: "yes",
    },
  ]);

  if (!confirm) {
    console.log(chalk.red("Canceled"));
    process.exit(1);
  }
}
