import { IBaseConfig } from "../../config";
import { execSync } from 'child_process';
import { HttpClient, logger } from '../../utils';
import { Commit, ConfigConstants } from "../../constants";
export abstract class GitBot {
    protected config: IBaseConfig;
    protected httpClient: HttpClient;
    constructor(config: IBaseConfig) {
        this.config = config;
        this.httpClient = new HttpClient({
            baseUrl: config.ci?.baseUrl || '',
            token: config.ci?.token || ''
        });
    }

    public hasTranslationChanges(): boolean {
        const { baseLanguage } = this.config;
        logger.debug(`[Localize AI][GitBot] checking diff...`);
        const diffOutput = execSync("git diff --name-only HEAD^").toString().trim();
        return diffOutput.includes(`${baseLanguage}.json`);
    }

    public createAndCheckoutBranch(translationBranch: string): void {
        logger.debug(`[Localize AI][GitBot] branch is creating...`, { translationBranch });
        execSync(`git checkout -b ${translationBranch}`);
    }

    public stagedChanges(): void {
        const { localesDir } = this.config;
        logger.debug('[Localize AI][GitBot] changes staging...');
        execSync(`git add ${localesDir}/*.json`);
    }

    public commitChanges(): void {
        logger.debug('[Localize AI][GitBot] changes committing...');
        execSync(`git config user.email "${this.config.email}"`);
        execSync(`git config user.name "${ConfigConstants.username}"`);
        execSync(`git commit -m ${Commit.title}`);
    }

    public pushChanges(translationBranch: string): void {
        logger.debug('[Localize AI][GitBot] changes pushing...', { translationBranch });
        execSync(`git push --set-upstream origin ${translationBranch}`);
    }

    public abstract createPullRequest(baseBranch: string, translationBranch: string): void
}   