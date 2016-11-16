import { SeatersApi } from './seaters-api';
import { SessionService } from './services/session-service';
import { WlService } from './services/wl-service';
import { JoinWlService } from './services/join-wl-service';
export declare class SeatersClient {
    api: SeatersApi;
    sessionService: SessionService;
    wlService: WlService;
    joinWlService: JoinWlService;
    constructor(apiPrefix?: string);
    test(): void;
}
