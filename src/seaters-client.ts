import { request } from 'popsicle';
import { Promise } from 'es6-promise';
import { SeatersApi } from './seaters-api';
import { SessionService } from './services/session-service';
import { WlService } from './services/wl-service';
import { ModalService } from './services/modal-service';
import { JoinWlService } from './services/join-wl-service';
import { JoinWlService as jwl2 } from './services/join-wl/join-wl-service';
import { JWLFlowService } from './services/join-wl/jwl-flow-service';

export class SeatersClient {

  public api: SeatersApi;

  public sessionService : SessionService;

  public wlService: WlService;

  public modalService: ModalService;

  public joinWlService: JoinWlService;

  public joinWlService2: jwl2;

  public joinWLFlowService: JWLFlowService;

  constructor (apiPrefix?: string) {
    this.api = new SeatersApi(apiPrefix || '/api'/*'https://api.dev-seaters.com/api'*/);
    this.sessionService = new SessionService(this.api);
    this.wlService = new WlService(this.api);
    this.modalService = new ModalService();
    this.joinWLFlowService = new JWLFlowService(this.modalService, this.sessionService);
    this.joinWlService = new JoinWlService(this.wlService, this.sessionService);
    this.joinWlService2 = new jwl2(this.modalService, this.joinWLFlowService, this.wlService, this.sessionService);

    console.log(this.modalService);
    console.log(this.joinWLFlowService);
  }

}
