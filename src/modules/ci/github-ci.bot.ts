import { IBaseConfig } from "../../config";
import { Commit } from "../../constants";
import { logger } from '../../utils';
import { GitBot } from './git.bot';

export class GithubCIBot extends GitBot {
    constructor(config: IBaseConfig){
        super(config);
    }

    public async createPullRequest(baseBranch: string, translationBranch: string): Promise<void> {
        const { ci } = this.config;

        logger.debug('[Localize AI][GithubCIBot] pull request creating...', { baseBranch, translationBranch });

        const endpoint = `${ci?.owner}/${ci?.repo}/pulls`;
        const payload = {
            title: Commit.title,
            body: Commit.description,
            head: translationBranch,
            base: baseBranch
        }

        const pullRequest = await this.httpClient.post(endpoint, payload);
        logger.info('[Localize AI][GithubCIBot] Pull request created', pullRequest.html_url);
    } 
}   