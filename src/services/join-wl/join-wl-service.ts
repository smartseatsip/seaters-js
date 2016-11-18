import { SessionService } from '../session-service';
import { ModalService } from '../modal-service';
import { WlService } from '../wl-service';
import { Promise } from 'es6-promise';

declare var require: any;

export class JoinWlService {

    constructor (
        private modalService: ModalService,
        private wlService: WlService,
        private sessionService: SessionService
    ) {
    }

    private setupTest () {
        this.modalService.showModal(
            require('./test.html'),
            require('./test.css')
        );
        var joinBtn = this.modalService.findElementByClass<HTMLButtonElement>('strs-join-button');
        joinBtn.onclick = () => this.setupTest2();
    }

    private setupTest2 () {
        this.modalService.showModal(
            require('./test2.html'),
            require('./test2.css')
        );
    }

    joinWl (wlId) {
        console.log('launching JoinWl popup for %s', wlId);
        this.setupTest();
    }

}