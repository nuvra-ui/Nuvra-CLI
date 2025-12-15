import chalk from "chalk";
import apiClient from "../services/api-client";

export async function getMetadata(component: string) {
  try {
    const response = await apiClient.get(`/${component}/metadata.json`);
    return response.data;
  } catch (error) {
    console.log(chalk.red(error));
  }
}
