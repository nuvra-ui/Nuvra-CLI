import { Command } from "commander";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import axios from "axios";

export const add = new Command()
  .name("add")
  .description("Add a component to your project")
  .argument("[component]", "name of the component to add")
  .action(async (component: string) => {
    await addComponent(component);
  });

async function addComponent(component: string) {
  async function getRegistry() {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/nuvra-ui/Nuvra-UI/main/src/registry.json"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  const registry = await getRegistry();

  if (registry[component]) {
    async function getMetadata() {
      try {
        const response = await axios.get(
          `https://raw.githubusercontent.com/nuvra-ui/Nuvra-UI/main/${registry[component].Path}/metadata.json`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
    const metaData = await getMetadata();

    async function getComponentFile() {
      try {
        const response = await axios.get(
          `https://raw.githubusercontent.com/nuvra-ui/Nuvra-UI/main/${metaData.files[0].path}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
    const componentFile = await getComponentFile();

    if (!existsSync(`src/ui/`)) {
      mkdirSync(`src/ui/`);
    }
    writeFileSync(`src/ui/` + metaData.name + `.tsx`, componentFile);
  } else {
    console.log(`Component "${component}" not found in registry.`);
  }
}
