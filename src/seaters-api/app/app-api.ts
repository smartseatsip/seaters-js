import { ApiContext } from '../../api';
import { Env } from './env';

export class AppApi {

    constructor (private apiContext: ApiContext) {

    }

    env(): Promise<Env> {
        return this.apiContext.get<Env>('/app/env');
    }
    

}