import { SeatersApi } from '../../seaters-api';
import { WaitingListService } from './waiting-list-service';
import { FanGroupService } from './fan-group-service';
import { Promise } from 'es6-promise';

export class FanService {

    private waitingListService: WaitingListService;

    private fanGroupService: FanGroupService;

    constructor (private seatersApi: SeatersApi) {
        this.waitingListService = new WaitingListService(seatersApi);
        this.fanGroupService = new FanGroupService(seatersApi);
    }

}