import { LocalizationAI } from "./modules/localize/localize";
import {GitBot, BitbucketCIBot, GithubCIBot } from "./modules/ci";
import { IBaseConfig, loadConfig } from "./config";
import { logger } from './utils'
import { Platform, ConfigConstants } from "./constants";
import path from 'path';

const isCIEnvironment = process.env.CI;
const baseBranch = process.env.GITHUB_REF || process.env.BITBUCKET_BRANCH || '';
const translationBranch = `localize-ai-${new Date().getTime()}`;

function ciCreator(config: IBaseConfig ): GitBot {
  switch(config.ci?.platform){
    case Platform.github:
      return new GithubCIBot(config);
    case Platform.bitbucket:
      return new BitbucketCIBot(config);
    default:
      throw new Error(`[Localize AI][ciCreator] unsupported ci environment: ${config.ci?.platform}`);
  }
}

async function run(): Promise<void> {
  const configPath = path.resolve(ConfigConstants.configPath);
  const packageJsonPath = path.resolve(ConfigConstants.packageJsonPath);

  const config = loadConfig(configPath, packageJsonPath);
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

  logger.info('[Localize AI][run] runned successfully.');
  process.exit(0);
}

run().catch((err) => {
  logger.error('[Localize AI][run] An error occurred:', err);
  process.exit(1);
});
