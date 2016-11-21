import { SeatersApi } from '../seaters-api';
import { Promise } from 'es6-promise';
import { WaitingList } from '../seaters-api/fan/waiting-list';

export class WlService {

    constructor (
        private api: SeatersApi
    ) {

    }

    getExtendedWl (wlId: string) {
        this.api.fan.waitingList(wlId).then((wl) => this.extendWl(wl));
    }

    private extendWl(wl: WaitingList) {
        return wl;
        //TODO - compute 'wl status' - see fanwebapp
    }

}