import apiClient from "../services/api-client.js";

export async function getFile(path: string) {
  const response = await apiClient.get(path);
  return response.data;
}
