import { SeatersApi } from './seaters-api';
import { SessionService } from './services/session-service';
import { WlService } from './services/wl-service';
import { ModalService } from './services/modal-service';
import { JWLFlowService } from './services/join-wl/jwl-flow-service';
export interface SeatersClientOptions {
    apiPrefix: string;
}
export declare class SeatersClient {
    private static DEFAULT_OPTIONS;
    api: SeatersApi;
    sessionService: SessionService;
    wlService: WlService;
    modalService: ModalService;
    jwlFlowService: JWLFlowService;
    constructor(options?: SeatersClientOptions);
}
export declare var getSeatersClient: (options?: SeatersClientOptions) => SeatersClient;
