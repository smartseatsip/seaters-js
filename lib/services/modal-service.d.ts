/// <reference path="../../node_modules/typescript/lib/lib.d.ts" />
export declare class ModalService {
    private overlay;
    private modal;
    constructor();
    private onEscape(callback);
    private showOverlay();
    private hideOverlay();
    private setupOverlay();
    private setupModal();
    showModal(template: string, style: string): void;
    closeModal(): void;
    findElementByClass<T extends HTMLElement>(cssClass: string): T;
    findElementByTagName<T extends HTMLElement>(tagName: string): T;
    findElementById<T extends HTMLElement>(id: string): T;
}
