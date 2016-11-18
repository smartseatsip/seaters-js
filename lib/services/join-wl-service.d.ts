/// <reference path="../../node_modules/typescript/lib/lib.d.ts" />
import { SessionService } from './session-service';
import { WlService } from './wl-service';
export declare class JoinWlService {
    private wlService;
    private sessionService;
    private overlay;
    private modal;
    private iframe;
    constructor(wlService: WlService, sessionService: SessionService);
    private onEscape(callback);
    private showOverlay();
    private hideOverlay();
    private setupOverlay();
    private setupModal();
    private setModalContent(template, style);
    private setupTest();
    private setupTest2();
    private findByStrsClass(cssClass);
    joinWl(wlId: any): void;
}
