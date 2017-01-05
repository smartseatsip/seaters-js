import { AppApi } from '../seaters-api/app/app-api';
import { Env } from '../seaters-api/app/app';
import { Promise } from 'es6-promise';

export class EnvService {

    private envP: Promise<Env>

    constructor (private appApi: AppApi) {
    }

    getEnv (): Promise<Env> {
        if (this.envP === undefined) {
            this.envP = this.appApi.env();
        }
        return this.envP;
    }

}