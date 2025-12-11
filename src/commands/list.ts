import axios from "axios";
import { Command } from "commander";

export const list = new Command()
  .name("list")
  .description("List all Components available in the registry")
  .action(async () => {
    await listComponents();
  });

async function listComponents() {
  async function getComponents() {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/nuvra-ui/Nuvra-UI/main/src/registry.json"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  const registry = await getComponents();
  console.log(
    `The following ${
      Object.keys(registry).length
    } Components were found in the registry:`
  );
  console.log(" ");
  Object.keys(registry).forEach((key) => {
    console.log(key);
  });
}
