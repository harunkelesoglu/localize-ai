import logger from '../utils/logger';
import path from 'path';
import { LanguageCodes } from "../constants/language-codes";

export interface IConfig {
  baseLanguage: LanguageCodes;
  localesDir: string;
  targetLanguages: LanguageCodes[];
  apiKey: string;
}

const baseConfig: IConfig = {
    baseLanguage: LanguageCodes.en,
    localesDir: "./locales",
    targetLanguages: [LanguageCodes.en, LanguageCodes.es],
    apiKey: process.env.OPENAI_API_KEY || 'your-api-key'
  };
  

export function loadConfig(configPath: string): IConfig {
  try {
    const configuration = require(path.resolve(configPath));
    return { ...baseConfig, ...configuration };
  } catch (error) {
    logger.error(`The ${configPath} configuration file must be defined in your rootDir.`);
    throw error;
  }
};
