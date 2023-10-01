import { IBaseConfig } from "../../config";
import { Commit } from "../../constants";
import { logger } from '../../utils/';
import { GitBot } from './git.bot';


export class BitbucketCIBot extends GitBot {
    constructor(config: IBaseConfig){
        super(config);
    }

    public async createPullRequest(baseBranch: string, translationBranch: string,): Promise<void> {
        const { ci } = this.config;

        logger.debug('[Localize AI][BitbucketCIBot] pull request creating...', { baseBranch, translationBranch });

        const endpoint = `${ci?.owner}/${ci?.repo}/pullrequests/`;
        const payload = {
            title: Commit.title,
            description: Commit.description,
            close_source_branch: true,
            source: {
                branch: {
                    name: translationBranch
                },
                repository:{
                    full_name:`${ci?.owner}/${ci?.repo}`
                }
            },
            destination: {
                branch: {
                    name: baseBranch
                }
            },
            reviewers: [],
        }

        const pullRequest = await this.httpClient.post(endpoint, payload);
        logger.info('[Localize AI][BitbucketCIBot] Pull request created', pullRequest.links.html.href);  
    } 
}   