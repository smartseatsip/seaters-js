import { request } from 'popsicle';
import { Promise } from 'es6-promise';
import { SeatersApi } from './seaters-api';

export class SeatersClient {

  public api: SeatersApi;

  constructor (apiPrefix?: string) {
    this.api = new SeatersApi(apiPrefix || '/api');
  }

}
