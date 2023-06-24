import { Parser } from '../utils';
import path from 'path';
import { BitbucketAPI, ConfigPath, GithubAPI, LanguageCodes, Platform } from "../constants";

const mainModulePath = require.main?.filename;
const projectDirectory = mainModulePath ? path.dirname(mainModulePath) : '';
const packageJsonPath = path.join(projectDirectory, 'package.json');
const configPath = path.resolve(ConfigPath);

export interface IBaseConfig  {
  baseLanguage: LanguageCodes;
  localesDir: string;
  targetLanguages: LanguageCodes[];
  apiKey: string;
}
export interface ICIConfig {
  platform: Platform | undefined,
  owner: string,
  repo: string,
  apiBaseUrl:  string,
  apiToken: string
}

export interface ILibConfig extends ICIConfig, IBaseConfig {}

const baseConfig: IBaseConfig = {
    baseLanguage: LanguageCodes.en,
    localesDir: "./locales",
    targetLanguages: [LanguageCodes.en, LanguageCodes.tr],
    apiKey: process.env.OPENAI_API_KEY || 'your-api-key'
  };
  

export function loadConfig(): ILibConfig {

    const configuration = require(configPath);
    const pkg = require(packageJsonPath);

    if(!pkg.repository?.url) {
      throw new Error(`[Localize AI][Config] repository information not found in ${packageJsonPath}`);
    }
    const { platform, owner, repo } = Parser.parseRepositoryUrl(pkg.repository.url);

    const ciConfig: ICIConfig = {
      platform,
      owner,
      repo,
      apiBaseUrl: (platform === Platform.github) ? GithubAPI.baseUrl || '' : (platform === Platform.bitbucket) ? BitbucketAPI.baseUrl || '' : '',
      apiToken: (platform === Platform.github) ? GithubAPI.token || '' : (platform === Platform.bitbucket) ? BitbucketAPI.token || '' : ''
    };


    return { ...baseConfig, ...ciConfig, ...configuration };
};
