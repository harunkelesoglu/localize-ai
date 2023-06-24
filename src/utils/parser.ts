import { Platform, RegexPatterns } from '../constants'

export class Parser {
    static parseRepositoryUrl(repositoryUrl: string): { platform: Platform | undefined, owner: string, repo: string } {
      let owner = '';
      let repo = '';
      let platform: Platform | undefined ;
  
      if (repositoryUrl.includes('github.com')) {
        const match = repositoryUrl.match(RegexPatterns.github);
        if (match) {
          owner = match[1];
          repo = match[2];
          platform = Platform.github;
        }
      } else if (repositoryUrl.includes('bitbucket.org')) {
        const match = repositoryUrl.match(RegexPatterns.bitbucket);
        if (match) {
          owner = match[1];
          repo = match[2];
          platform = Platform.bitbucket;
        }
      }
  
      return { platform, owner, repo };
    }
  }
  