import { Promise } from 'es6-promise';
import * as core from 'core-js/library';

import { RequestDriver, BrowserRequestDriver } from './api';
import { SeatersApi } from './seaters-api';
import { SessionService } from './services/session-service';
import { WaitingListService } from './services/waiting-list-service';
import { FanGroupService } from './services/fan-group-service';
import { EnvService } from './services/env-service';
import { AlgoliaForSeatersService } from './services/algolia-for-seaters/algolia-for-seaters-service';
import { ModalService } from './services/modal-service';
import { JwlFlowService } from './services/join-wl/jwl-flow-service';
import { TranslationService } from './services/translation-service';

export interface SeatersClientOptions {
  apiPrefix: string,
  requestDriver?: RequestDriver
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

  public envService: EnvService;

  public algoliaForSeatersService: AlgoliaForSeatersService;

  constructor (options?: SeatersClientOptions) {
    options = core.Object.assign({}, SeatersClient.DEFAULT_OPTIONS, options);

    var requestDriver: RequestDriver = options.requestDriver || BrowserRequestDriver;

    this.api = new SeatersApi(options.apiPrefix, requestDriver);
    this.translationService = new TranslationService();
    this.modalService = new ModalService(this.translationService);

    this.sessionService = new SessionService(this.api);
    this.waitingListService = new WaitingListService(this.api);
    this.fanGroupService = new FanGroupService(this.api);
    this.envService = new EnvService(this.api.app);
    this.algoliaForSeatersService = new AlgoliaForSeatersService(this.envService);

    this.jwlFlowService = new JwlFlowService(
      this.modalService,
      this.sessionService,
      this.waitingListService,
      this.fanGroupService,
      this.translationService
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
