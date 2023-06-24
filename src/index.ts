import { LocalizationAI } from "./modules/localize/localize";
import {GitBot, BitbucketCIBot, GithubCIBot } from "./modules/ci";
import { ILibConfig, loadConfig } from "./config";
import { logger } from './utils'
import { Platform, ConfigPath } from "./constants";
import path from 'path';

const isCIEnvironment = process.env.CI;
const baseBranch = process.env.GITHUB_REF || process.env.BITBUCKET_BRANCH || '';
const translationBranch = `localize-ai-${new Date().getTime()}`;

const mainModulePath = require.main?.filename;
const projectDirectory = mainModulePath ? path.dirname(mainModulePath) : '';
const packageJsonPath = path.join(projectDirectory, 'package.json');
const configPath = path.resolve(ConfigPath);


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
