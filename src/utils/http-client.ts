import axios from 'axios';
import { logger } from '../utils';

export class HttpClient {
    private baseUrl: string;
    private token: string;
  
    constructor(baseUrl: string, token: string) {
      this.baseUrl = baseUrl;
      this.token = token;
    }
  
    private getHeaders(): { [key: string]: string } {
      return {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      };
    }
  
    public async post(endpoint: string, payload: any): Promise<any> {
      const headers = this.getHeaders();

      try{
        const response = await axios.post(`${this.baseUrl}${endpoint}`, payload, { headers });
        return response.data;
    } catch(err) {
        logger.error('[Localize AI][HttpClient] Error creating pull request:', { err });
        throw err;
    }
    }
  }