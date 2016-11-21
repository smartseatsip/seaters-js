import { request } from 'popsicle';
import { Promise } from 'es6-promise';
import * as core from 'core-js/library';

import { SeatersApi } from './seaters-api';
import { SessionService } from './services/session-service';
import { WlService } from './services/wl-service';
import { FanGroupService } from './services/fan-group-service';
import { ModalService } from './services/modal-service';
import { JwlFlowService } from './services/join-wl/jwl-flow-service';

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

  public fanGroupService: FanGroupService;

  public modalService: ModalService;

  public jwlFlowService: JwlFlowService;

  constructor (options?: SeatersClientOptions) {
    options = core.Object.assign({}, SeatersClient.DEFAULT_OPTIONS, options);
    this.api = new SeatersApi(options.apiPrefix);
    this.sessionService = new SessionService(this.api);
    this.wlService = new WlService(this.api);
    this.fanGroupService = new FanGroupService(this.api);
    this.modalService = new ModalService();
    this.jwlFlowService = new JwlFlowService(this.modalService, this.sessionService, this.wlService);
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
