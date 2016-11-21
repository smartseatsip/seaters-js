import * as api from '../api';
import { AppApi } from './app/app-api';
import { FanApi } from './fan/fan-api';
import { AuthenticationApi } from './authentication/authentication-api';
export declare class SeatersApi extends api.ApiContext {
    private prefix;
    app: AppApi;
    fan: FanApi;
    authentication: AuthenticationApi;
    constructor(prefix: string);
}
