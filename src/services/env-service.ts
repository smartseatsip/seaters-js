import { SeatersApi, app } from '../seaters-api';
import { Promise } from 'es6-promise';

export class EnvService {

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