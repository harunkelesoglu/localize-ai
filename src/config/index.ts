import { Parser } from '../utils';
import { BitbucketAPI, ConfigConstants, GithubAPI, LanguageCodes, Platform } from "../constants";

export interface IBaseConfig  {
  baseLanguage: LanguageCodes;
  localesDir: string;
  targetLanguages: LanguageCodes[];
  apiKey: string;
  email: string;
}
export interface ICIConfig {
  platform: Platform | undefined,
  owner: string,
  repo: string,
  apiBaseUrl:  string,
  apiToken: string
}

export interface ILibConfig extends ICIConfig, IBaseConfig {}

export const baseConfig: IBaseConfig = {
    baseLanguage: LanguageCodes.English,
    localesDir: ConfigConstants.localesDir,
    targetLanguages: [LanguageCodes.English, LanguageCodes.Turkish],
    apiKey: ConfigConstants.openAIKey,
    email: ConfigConstants.email
  };
  

export function loadConfig(configPath: string, packageJsonPath: string): ILibConfig {

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
