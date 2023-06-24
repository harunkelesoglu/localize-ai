import { ILibConfig } from "../../config";
import { Commit } from "../../constants";
import { logger, HttpClient, Parser } from '../../utils/';
import { GitBot } from './git.bot';


export class BitbucketCIBot extends GitBot {
    private httpClient: HttpClient;
    constructor(config: ILibConfig){
        super(config);
        this.httpClient = new HttpClient(config.apiBaseUrl, config.apiToken);
    }

    public async createPullRequest(baseBranch: string, translationBranch: string,): Promise<void> {
        const { owner, repo } = this.config;

        logger.debug('[Localize AI][BitbucketCIBot] pull request creating...', { baseBranch, translationBranch });

        const endpoint = `${owner}/${repo}/pullrequests`;
        const payload = {
            title: Commit.title,
            description: Commit.description,
            source: {
                branch: {
                    name: translationBranch
                }
            },
            destination: {
                branch: {
                    name: baseBranch
                }
            }
        }

        const pullRequest = await this.httpClient.post(endpoint, payload);
        logger.info('[Localize AI][BitbucketCIBot] Pull request created', pullRequest.links.html.href);  
    } 
}   