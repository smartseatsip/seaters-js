import { AlgoliaService } from './../algolia-service';
import { Promise } from 'es6-promise';
import { EnvService } from './../env-service';
import { FanGroup } from './fan-group';

export class AlgoliaForSeatersService {

    private algoliaServiceP: Promise<AlgoliaService>;

    private algoliaAttributes: Object;

    constructor (private envService: EnvService) {
        this.algoliaServiceP = envService.getEnv().then(env => {
            var cfg = env.algoliaConfiguration;
            this.algoliaAttributes = cfg.attributes;
            return new AlgoliaService(cfg.appId, cfg.apiKey, cfg.indexName);
        });
    }

    getFangroupById (fangroupId: string): Promise<FanGroup> {
        return this.algoliaServiceP.then(algoliaService => {
            var query = algoliaService.buildExactSearchQuery(
                fangroupId, 'fanGroupId', 'FAN_GROUP', 1
            );
            return algoliaService.search(query);
        });
        
    }

    getWishlistsByFangroupId (fangroupId: string, pageSize: number, page: number): Promise<any> {
        return this.algoliaServiceP.then(algoliaService => {  
            var query = algoliaService.buildExactSearchQuery(
                fangroupId, 'groupId', 'WAITING_LIST', pageSize//, page
            );
            return algoliaService.search(query);
        });
    }

}