import { SessionService } from '../session-service';
import { ModalService } from '../modal-service';
import { WlService } from '../wl-service';
export declare class JoinWlService {
    private modalService;
    private wlService;
    private sessionService;
    constructor(modalService: ModalService, wlService: WlService, sessionService: SessionService);
    private setupTest();
    private setupTest2();
    joinWl(wlId: any): void;
}
