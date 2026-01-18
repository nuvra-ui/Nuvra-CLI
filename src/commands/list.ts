import { Command } from "commander";
import { getFile } from "../utils/getFile.js";
import {
  type RegistryItem,
  registrySchema,
} from "../schemas/registrySchema.js";
import { log } from "@clack/prompts";

export const list = new Command()
  .name("list")
  .description("List all Components available in the registry")
  .argument("[framework]", "The framework to list components for")
  .action(async (framework) => listComponents(framework));

async function listComponents(framework: string) {
  const registry = await getFile("/registry.json");
  try {
    registrySchema.parse(registry);
    log.success("Successfully parsed registry.");
  } catch {
    log.error("Error parsing registry.");
  }

  const components = registry[framework];
  if (!components) {
    log.error("Framework not found.")
    process.exit(0)
  }
  log.info(`Discovered ${components.length} ${framework} components:`);
  components.forEach((c: RegistryItem) => console.log(`   • ${c.name}`));
}
