import { request } from 'popsicle';
import { Promise } from 'es6-promise';
import { SeatersApi } from './seaters-api';
import { SessionService } from './services/session-service';

export class SeatersClient {

  public api: SeatersApi;

  public sessionService : SessionService;

  constructor (apiPrefix?: string) {
    this.api = new SeatersApi(apiPrefix || '/api');
    this.sessionService = new SessionService(this.api);
  }

}
