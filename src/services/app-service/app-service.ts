import { SeatersApi } from '../../seaters-api';
import { Promise } from 'es6-promise';
import { app } from './app-types';

export class AppService {

    private envP: Promise<app.Env>

    constructor (private seatersApi: SeatersApi) {
    }

    getEnv (): Promise<app.Env> {
        if (this.envP === undefined) {
            this.envP = this.seatersApi.app.env();
        }
        return this.envP;
    }

}