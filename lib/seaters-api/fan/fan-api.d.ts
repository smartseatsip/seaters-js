import { ApiContext } from '../../api';
import { WaitingList } from './waitinglist';
export declare class FanApi {
    private apiContext;
    constructor(apiContext: ApiContext);
    waitinglist(waitingListId: string): Promise<WaitingList>;
}
