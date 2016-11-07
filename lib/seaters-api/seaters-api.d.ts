import * as api from '../api';
import { AppApi } from './app/app-api';
import { AuthenticationApi } from './authentication/authentication-api';
export declare class SeatersApi extends api.ApiContext {
    private prefix;
    app: AppApi;
    authentication: AuthenticationApi;
    constructor(prefix: string);
}
