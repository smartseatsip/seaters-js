import { request } from 'popsicle';
import { Promise } from 'es6-promise';
import { ApiContext } from './seaters-api';

export class SeatersClient {

  private apiContext: ApiContext;

  constructor (apiPrefix?: string) {
    this.apiContext = new ApiContext(apiPrefix || '/api');
  }

  greet (name: string): string {
    return 'Hello, ' + name;
  }

  getAppEnv (): Promise<any> {
    return this.apiContext.createPopsicleRequest({
      abstractEndpoint: '/app/env',
      method: 'GET'
    });
  }

}
