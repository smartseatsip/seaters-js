import { request } from 'popsicle';
import { Promise } from 'es6-promise';
import * as core from 'core-js/library';

import { SeatersApi } from './seaters-api';
import { SessionService } from './services/session-service';
import { WaitingListService } from './services/waiting-list-service';
import { FanGroupService } from './services/fan-group-service';
import { ModalService } from './services/modal-service';
import { JwlFlowService } from './services/join-wl/jwl-flow-service';
import { TranslationService } from './services/translation-service';

export interface SeatersClientOptions {
  apiPrefix: string
}

export class SeatersClient {

  private static DEFAULT_OPTIONS = <SeatersClientOptions> {
    apiPrefix: '${api.location}'
  }

  public api: SeatersApi;

  public sessionService : SessionService;

  public waitingListService: WaitingListService;

  public fanGroupService: FanGroupService;

  public modalService: ModalService;

  public jwlFlowService: JwlFlowService;

  public translationService: TranslationService;

  constructor (options?: SeatersClientOptions) {
    options = core.Object.assign({}, SeatersClient.DEFAULT_OPTIONS, options);
    
    this.api = new SeatersApi(options.apiPrefix);
    this.translationService = new TranslationService();
    this.modalService = new ModalService(this.translationService);
    
    this.sessionService = new SessionService(this.api);
    this.waitingListService = new WaitingListService(this.api);
    this.fanGroupService = new FanGroupService(this.api);
    
    this.jwlFlowService = new JwlFlowService(
      this.modalService,
      this.sessionService,
      this.waitingListService,
      this.fanGroupService
    );
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
