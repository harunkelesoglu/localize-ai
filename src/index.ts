import { LocalizationAI } from "./modules/localize";
import { loadConfig } from "./config";

async function run(): Promise<void> {
  const configPath = './localize-ai.config.js';
  const config = loadConfig(configPath);
  const localize = new LocalizationAI(config);
  await localize.translate();
  process.exit(0);
}

run();
