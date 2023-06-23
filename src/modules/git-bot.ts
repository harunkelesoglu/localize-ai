import fs from 'fs';
import { IConfig } from "../config";
import { execSync } from 'child_process';
import logger from '../utils/logger';
import path from 'path';

const mainModulePath = require.main?.filename;

const projectDirectory = mainModulePath ? path.dirname(mainModulePath) : '';
const packageJsonPath = path.join(projectDirectory, 'package.json');

export class GitBot {
    private config: IConfig;
    constructor(config: IConfig){
        this.config = config;
    }

    public hasTranslationChanges(): boolean {
        const { baseLanguage } = this.config;

        logger.debug(`[GitBot] checking diff...`);
        const diffOutput = execSync("git diff --name-only HEAD^").toString().trim();
        return diffOutput.includes(`${baseLanguage}.json`);
    }

    public createAndCheckoutBranch(translationBranch: string): void {
        
        logger.debug(`[GitBot] branch is creating...`, { translationBranch });
        execSync(`
        if git rev-parse --verify --quiet ${translationBranch}; then
            git checkout ${translationBranch}
         else
            git checkout -b ${translationBranch}
        fi`);
    }

    public stagedChanges(): void{
        const { localesDir } = this.config;

        logger.debug('[GitBot] changes staging...');
        execSync(`git add ${localesDir}/*.json`);
    }

    public commitChanges(): void {

        logger.debug('[GitBot] changes committing...');

        execSync('git config user.email "localize-ai@celsus.com"');
        execSync('git config user.name "Localize AI"');
        
        execSync('git commit -m "chore: Translations added" --author="Localize AI <localize-ai@celsus.com>" -c "user.name=Localize AI" -c "user.email=localize-ai@celsus.com" -c "credential.helper=store --file=.git/credentials"');
    }

    public pushChanges(translationBranch: string): void {

        logger.debug('[GitBot] changes pushing...', { translationBranch });
        execSync(`git push origin ${translationBranch}`);
    }

    public createPullRequest(baseBranch: string, translationBranch: string) {

        logger.debug('[GitBot] pull request creating...', { baseBranch, translationBranch });
        execSync(`gh pr create --base ${baseBranch} --head ${translationBranch} --title "localize-ai: Translation Update" --body "Translations completed"`);
    } 
}   