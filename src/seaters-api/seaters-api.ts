import * as api from '../api';
import { AppApi } from './app/app-api';

export class SeatersApi extends api.ApiContext {

    public app: AppApi;

    constructor (private prefix: string) { 
        super(prefix);
        this.app = new AppApi(this);
    }

}