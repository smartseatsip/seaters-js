import { request } from 'popsicle';
import { Promise } from 'es6-promise';
import { SeatersApi } from './seaters-api';
import { SessionService } from './services/session-service';
import { WlService } from './services/wl-service';
import { JoinWlService } from './services/join-wl-service';

export class SeatersClient {

  public api: SeatersApi;

  public sessionService : SessionService;

  public wlService: WlService;

  public joinWlService: JoinWlService;

  constructor (apiPrefix?: string) {
    this.api = new SeatersApi(apiPrefix || '/api'/*'https://api.dev-seaters.com/api'*/);
    this.sessionService = new SessionService(this.api);
    this.wlService = new WlService(this.api);
    this.joinWlService = new JoinWlService(this.wlService, this.sessionService);
  }

}
