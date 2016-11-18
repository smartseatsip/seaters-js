import { SeatersApi } from './seaters-api';
import { SessionService } from './services/session-service';
import { WlService } from './services/wl-service';
import { ModalService } from './services/modal-service';
import { JoinWlService } from './services/join-wl-service';
import { JoinWlService as jwl2 } from './services/join-wl/join-wl-service';
export declare class SeatersClient {
    api: SeatersApi;
    sessionService: SessionService;
    wlService: WlService;
    modalService: ModalService;
    joinWlService: JoinWlService;
    joinWlService2: jwl2;
    constructor(apiPrefix?: string);
}
