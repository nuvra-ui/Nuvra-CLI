import chalk from "chalk";
import apiClient from "../services/api-client";

export async function getComponentFile(componentPath: string) {
  try {
    const response = await apiClient.get("/" + componentPath);
    return response.data;
  } catch (error) {
    console.log(chalk.red(error));
  }
}
