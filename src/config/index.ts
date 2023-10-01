import { Parser } from '../utils';
import { BitbucketAPI, ConfigConstants, GithubAPI, LanguageCodes, OpenAIAPI, OpenAIModels, Platform, SortBy } from "../constants";

export interface IAPIConfig {
  baseUrl:  string;
  token: string;
};

export interface ICIConfig extends IAPIConfig {
  platform: Platform | undefined;
  owner: string;
  repo: string;
};

export interface IAIConfig extends IAPIConfig {
  model: OpenAIModels | string,
  organization?: string,
};

export interface IBaseConfig  {
  baseLanguage: LanguageCodes;
  localesDir: string;
  targetLanguages: LanguageCodes[];
  email: string;
  sortBy: SortBy;
  ai: IAIConfig;
  ci?: ICIConfig;
};

export const baseConfig: IBaseConfig = {
    baseLanguage: LanguageCodes.English,
    localesDir: ConfigConstants.localesDir,
    targetLanguages: [LanguageCodes.English, LanguageCodes.Turkish],
    email: ConfigConstants.email,
    sortBy: SortBy.asceding,
    ai: {
      baseUrl: OpenAIAPI.baseUrl,
      token: OpenAIAPI.token,
      model:  OpenAIAPI.model
    },
  };
  

export function loadConfig(configPath: string, packageJsonPath: string): IBaseConfig {

    const configuration = require(configPath);
    const pkg = require(packageJsonPath);

    if(!pkg.repository?.url) {
      throw new Error(`[Localize AI][loadConfig] repository information not found in ${packageJsonPath}`);
    }
    const { platform, owner, repo } = Parser.parseRepositoryUrl(pkg.repository.url);

    const ciConfig: ICIConfig = {
      platform,
      owner,
      repo,
      baseUrl: (platform === Platform.github) ? GithubAPI.baseUrl || '' : (platform === Platform.bitbucket) ? BitbucketAPI.baseUrl || '' : '',
      token: (platform === Platform.github) ? GithubAPI.token || '' : (platform === Platform.bitbucket) ? BitbucketAPI.token || '' : ''
    };


    return { ...baseConfig, ci: { ...ciConfig }, ...configuration };
};
