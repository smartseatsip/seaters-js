import * as api from '../api';
import { AppApi } from './app/app-api';
export declare class SeatersApi extends api.ApiContext {
    private prefix;
    app: AppApi;
    constructor(prefix: string);
}
