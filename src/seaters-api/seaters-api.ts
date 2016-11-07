import * as api from '../api';
import { AppApi } from './app/app-api';
import { AuthenticationApi } from './authentication/authentication-api';

export class SeatersApi extends api.ApiContext {

    public app: AppApi;

    public authentication: AuthenticationApi;

    constructor (private prefix: string) { 
        super(prefix);
        this.app = new AppApi(this);
        this.authentication = new AuthenticationApi(this);
    }

}