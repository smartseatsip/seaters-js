import { ApiContext } from '../../api';

export class HealthApi {

    constructor (private apiContext: ApiContext) {

    }

    node(): Promise<string> {
        return this.apiContext.doStringRequest({
            method: 'GET',
            abstractEndpoint: '/health/node'
        });
    }

}