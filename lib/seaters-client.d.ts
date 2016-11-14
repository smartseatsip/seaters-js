import { SeatersApi } from './seaters-api';
import { SessionService } from './services/session-service';
export declare class SeatersClient {
    api: SeatersApi;
    sessionService: SessionService;
    constructor(apiPrefix?: string);
}
