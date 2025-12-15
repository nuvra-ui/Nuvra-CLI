import chalk from "chalk";
import apiClient from "../services/api-client";

export async function getRegistry() {
  try {
    const response = await apiClient.get("/src/registry.json");
    return response.data;
  } catch (error) {
    console.log(chalk.red(error));
  }
}
