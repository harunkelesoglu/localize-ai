import axios from 'axios';
import { logger } from '../utils';
import { IAPIConfig } from '../config';

export class HttpClient {
    private readonly api: IAPIConfig
    constructor(apiConfig: IAPIConfig) {
      this.api = apiConfig;
    }
  
    private getHeaders(): { [key: string]: string } {
      return {
        'Authorization': `Bearer ${this.api.token}`,
        'Content-Type': 'application/json'
      };
    }
  
    public async post(endpoint: string, payload: any): Promise<any> {
      const headers = this.getHeaders();

      try{
        const response = await axios.post(`${this.api.baseUrl}${endpoint}`, payload, { headers });
        return response.data;
    } catch(err) {
        logger.error('[Localize AI][HttpClient] Something went wrong', { err });
        throw err;
    }
    }
  }