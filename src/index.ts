import { LocalizationAI } from "./modules/localize/localize";
import {GitBot, BitbucketCIBot, GithubCIBot } from "./modules/ci";
import { ILibConfig, loadConfig } from "./config";
import { logger } from './utils'
import { Platform } from "./constants";

const isCIEnvironment = process.env.CI;
const baseBranch = process.env.GITHUB_REF || process.env.BITBUCKET_BRANCH || '';
const translationBranch = `localize-ai-${new Date().getTime()}`;


function ciCreator(config: ILibConfig ): GitBot {
  switch(config.platform){
    case Platform.github:
      return new GithubCIBot(config);
    case Platform.bitbucket:
      return new BitbucketCIBot(config);
    default:
      throw new Error(`[Localize AI][ciCreator] unsupported ci environment: ${config.platform}`);
  }
}


async function run(): Promise<void> {
  const config = loadConfig();
  const localize = new LocalizationAI(config);
  
  if(isCIEnvironment) {
    const git = ciCreator(config);
    
    if(git.hasTranslationChanges()) {

      git.createAndCheckoutBranch(translationBranch);
      await localize.translate();
      git.stagedChanges();
      git.commitChanges();
      git.pushChanges(translationBranch);
      git.createPullRequest(baseBranch, translationBranch);

    } else {
      logger.info('[Localize AI][run] There are no new translations.');
    }

  } else {
    await localize.translate();
  }

  logger.debug('[Localize AI][run] runned successfully.');
  process.exit(0);
}

run().catch((err) => {
  logger.error('[Localize AI][run] An error occurred:', err);
  process.exit(1);
});
