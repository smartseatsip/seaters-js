import { request } from 'popsicle';
import { Promise } from 'es6-promise';
import * as core from 'core-js/library';

import { SeatersApi } from './seaters-api';
import { SessionService } from './services/session-service';
import { WlService } from './services/wl-service';
import { ModalService } from './services/modal-service';
import { JoinWlService } from './services/join-wl-service';
import { JoinWlService as jwl2 } from './services/join-wl/join-wl-service';

export interface SeatersClientOptions {
  apiPrefix: string
}

export class SeatersClient {

  private static DEFAULT_OPTIONS = <SeatersClientOptions> {
    apiPrefix: '${api.location}'
  }

  public api: SeatersApi;

  public sessionService : SessionService;

  public wlService: WlService;

  public modalService: ModalService;

  public joinWlService: JoinWlService;

  public joinWlService2: jwl2;

  constructor (options?: SeatersClientOptions) {
    core.Object.assign({}, SeatersClient.DEFAULT_OPTIONS, options);
    this.api = new SeatersApi(options.apiPrefix);
    this.sessionService = new SessionService(this.api);
    this.wlService = new WlService(this.api);
    this.modalService = new ModalService();
    this.joinWlService = new JoinWlService(this.wlService, this.sessionService);
    this.joinWlService2 = new jwl2(this.modalService, this.wlService, this.sessionService);
  }

}

export var getSeatersClient = (() => {
  var client: SeatersClient = undefined;
  return (options?: SeatersClientOptions) => {
    if(client === undefined) {
      client = new SeatersClient(options);
    }
    return client;
  };
})();