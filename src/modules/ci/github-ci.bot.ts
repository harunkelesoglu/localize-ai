import { IBaseConfig, ILibConfig } from "../../config";
import { Commit } from "../../constants";
import {logger, HttpClient, Parser} from '../../utils';
import { GitBot } from './git.bot';

export class GithubCIBot extends GitBot {
    private httpClient : HttpClient;
    constructor(config: ILibConfig){
        super(config);
        this.httpClient = new HttpClient(config.apiBaseUrl, config.apiToken);
    }

    public async createPullRequest(baseBranch: string, translationBranch: string): Promise<void> {
        const { owner, repo } = this.config;

        logger.debug('[Localize AI][GithubCIBot] pull request creating...', { baseBranch, translationBranch });

        const endpoint = `${owner}/${repo}/pulls`;
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