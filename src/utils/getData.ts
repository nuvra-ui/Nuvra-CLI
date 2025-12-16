import chalk from "chalk";
import apiClient from "../services/api-client";

export async function getData(path: string) {
  try {
    const response = await apiClient.get(path);
    return response.data;
  } catch (error) {
    console.log(chalk.red(error));
  }
}
