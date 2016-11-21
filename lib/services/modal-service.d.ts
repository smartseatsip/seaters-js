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
    /**
     * Check for required field
     * @param value
     * @returns {boolean}
     */
    validateRequired(value: string): boolean;
    /**
     * Hide all form field errors
     */
    resetFormErrors(): void;
    /**
     * Display a form field error
     * @param field
     * @param error
     */
    showFieldError(field: string, error: string): void;
    /**
    * Client side form validation
    * @param validationErrors
    */
    showFormErrors(validationErrors: any): void;
    showModal(template: string, style: string): void;
    closeModal(): void;
    findElementByClass<T extends HTMLElement>(cssClass: string): T;
    findElementByTagName<T extends HTMLElement>(tagName: string): T;
    findElementById<T extends HTMLElement>(id: string): T;
}
