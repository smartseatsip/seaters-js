import * as api from '../api';
import { AppApi } from './app/app-api';
import { FanApi } from './fan/fan-api';
import { AuthenticationApi } from './authentication/authentication-api';
import { AdminApi } from './admin';

export class SeatersApi extends api.ApiContext {

    public app: AppApi;
    public fan: FanApi;
    public authentication: AuthenticationApi;
    public admin: AdminApi;

    constructor (prefix: string, requestDriver: api.RequestDriver) {
        super(prefix, requestDriver);
        this.app = new AppApi(this);
        this.fan = new FanApi(this);
        this.authentication = new AuthenticationApi(this);
        this.admin = new AdminApi(this);
    }

}
