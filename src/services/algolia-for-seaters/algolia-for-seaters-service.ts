import { AlgoliaService, SearchResult } from './../algolia-service';
import { Promise } from 'es6-promise';
import { EnvService } from './../env-service';
import { FanGroup } from './fan-group';
import { WaitingList } from './waiting-list';

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
            return algoliaService.search(query)
            .then(res => {
                if (res.nbHits === 1) {
                    return <FanGroup> res.hits[0];
                } else if (res.nbHits === 0) {
                    throw new Error('404 - not found: FanGroup (' + fangroupId + ')');
                } else {
                    throw new Error('500 - unexpected nb hits from algolia on query: ' + res.query);
                }
            });
        });
        
    }

    getWishlistsByFangroupId (fangroupId: string, pageSize: number, page: number): Promise<SearchResult<WaitingList>> {
        return this.algoliaServiceP.then(algoliaService => {  
            var query = algoliaService.buildExactSearchQuery(
                fangroupId, 'groupId', 'WAITING_LIST', pageSize//, page
            );
            return algoliaService.search(query);
        });
    }

}