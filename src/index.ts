import { LocalizationAI } from "./modules/localize";
import { GitBot } from "./modules/git-bot";
import { loadConfig } from "./config";
import logger from './utils/logger'

const isCIEnvironment = process.env.CI;
const baseBranch = process.env.GITHUB_REF || '';
const translationBranch = `localize-ai-${new Date().getTime()}`;


async function run(): Promise<void> {
  const configPath = './localize-ai.config.js';
  const config = loadConfig(configPath);
  const localize = new LocalizationAI(config);
  
  if(isCIEnvironment) {
    const git = new GitBot(config);
    
    if(git.hasTranslationChanges()) {

      git.createAndCheckoutBranch(translationBranch);
      await localize.translate();
      git.stagedChanges();
      git.commitChanges();
      git.pushChanges(translationBranch);
      git.createPullRequest(baseBranch, translationBranch);

    } else {
      logger.info('[Main] There are no new translations.');
    }

  } else {
    await localize.translate();
  }

  logger.debug('[Main] runned successfully.');
  process.exit(0);
}

run().catch((err) => {
  logger.error('[Main] An error occurred:', err);
  process.exit(1);
});
