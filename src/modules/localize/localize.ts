import * as fs from 'fs';
import { HttpClient, logger, Sorter } from '../../utils';
import { LanguageCodes } from '../../constants';
import { IBaseConfig } from '../../config';

export interface Translation {
  [key: string]: string;
}

export class LocalizationAI {
  private config: IBaseConfig;
  private httpClient: HttpClient;

  constructor(config: IBaseConfig) {
    this.config = config;
    this.httpClient = new HttpClient({
      baseUrl: config.ai?.baseUrl || '',
      token: config.ai?.token || ''
    });
  }

  private async openAITranslator(baseLanguage: LanguageCodes, targetLanguage: LanguageCodes, sourceText: string): Promise<string> {

    logger.debug('[Localize AI][openAITranslator] being translated...', { baseLanguage, targetLanguage, sourceText });

    const endpoint = 'chat/completions'
    const createChatCompletionRequest = {
      model: this.config.ai.model,
      messages: [
        {
          role: "user",
          content: `Translate the following ${baseLanguage} expression to the ${targetLanguage}\n ${sourceText}`
        }
      ]
    }

    const translation: any = await this.httpClient.post(endpoint ,createChatCompletionRequest)
    return translation.choices[0].message.content;
  }

  public async translate(): Promise<void> {
    const { localesDir, baseLanguage, targetLanguages, sortBy } = this.config;
    const baseFilePath = `${localesDir}/${baseLanguage}.json`;

    logger.debug('[Localize AI][translate] started translate', { localesDir, baseLanguage, targetLanguages });

    if (!fs.existsSync(localesDir)) {
      throw new Error(`[Localize AI][translate] Locales directory "${localesDir}" does not exist.`);
    }

    if (!fs.existsSync(baseFilePath)) {
      throw new Error(`[Localize AI][translate] Base language file "${baseFilePath}" does not exist.`);
    }

    const baseTranslations = JSON.parse(fs.readFileSync(baseFilePath, 'utf-8'));

    for (const targetLanguage of targetLanguages) {
      const targetFilePath = `${localesDir}/${targetLanguage}.json`;
      const targetTranslations = fs.existsSync(targetFilePath) ? JSON.parse(fs.readFileSync(targetFilePath, 'utf-8')) : {};
      const untranslatedKeys = Object.keys(baseTranslations).filter((key) => !targetTranslations[key]);

      for (const key of untranslatedKeys) {
        const sourceText = baseTranslations[key];
        targetTranslations[key] = await this.openAITranslator(baseLanguage, targetLanguage, sourceText);
      }

      fs.writeFileSync(targetFilePath, JSON.stringify(Sorter[sortBy](targetTranslations), null, 2));
      logger.info(`"${targetLanguage}.json" translation completed`);
    }

    logger.info('[Localize AI][translate] Translation process completed.');
  }
}
