import { ApiContext, RequestDriver } from '../api';
import { IndicesApi } from './indices/indices-api';

const APP_ID_HEADER = 'X-Algolia-Application-Id';
const API_KEY_HEADER = 'X-Algolia-API-Key';
const API_LOCATION_INFIX = '-dsn.algolia.net/1/';

function apiPrefix (appId: string, apiKey: string): string {
    return 'https://' + appId.toLowerCase() + API_LOCATION_INFIX; 
}

export class AlgoliaApi extends ApiContext {

    public indices: IndicesApi;

    constructor (private appId: string, private apiKey: string, requestDriver: RequestDriver) {
        super(apiPrefix(appId, apiKey), requestDriver);
        this.indices = new IndicesApi(this);
        this.setHeader(APP_ID_HEADER, appId);
        this.setHeader(API_KEY_HEADER, apiKey);
    }

}
