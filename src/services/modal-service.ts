/// <reference path="../../node_modules/typescript/lib/lib.d.ts" />

import { Promise } from 'es6-promise';

declare var require: any;

export class ModalService {

    private overlay: HTMLElement;

    private modal: HTMLElement;

    private modalContent: HTMLElement;

    private onClose: () => void;

    constructor () {
    }

    private onEscape (callback: () => void): () => void {
        function escapeListener (evt: KeyboardEvent): void {
            if (evt.key == 'Escape') {
                callback();
                evt.preventDefault();
            }
        }

        function removeEscapeListener (): void {
            window.removeEventListener('keydown', escapeListener, true);
        }

        window.addEventListener('keydown', escapeListener, true);

        return removeEscapeListener;
    }

    private showOverlay () {
        console.log('[ModalService] showing seaters overlay');
        this.overlay.style.display = 'block';
    }

    private hideOverlay () {
        console.log('[ModalService] hiding seaters overlay');
        this.overlay.style.display = 'none';
    }

    private setupOverlay () {
        if (this.overlay !== undefined) {
            return this.overlay;
        }

        this.overlay = document.createElement('div');
        this.overlay.id = 'seaters-overlay';
        this.overlay.style.position = 'fixed';
        this.overlay.style.left = '0px';
        this.overlay.style.right = '0px';
        this.overlay.style.top = '0px';
        this.overlay.style.bottom = '0px';
        this.overlay.style.backgroundColor = 'rgba(30, 30, 30, 0.3)';
        this.overlay.style.display = 'none';

        this.onEscape(() => {
            this.hideOverlay();
            if (this.onClose) {
                this.onClose();
            }
        });

        document.getElementsByTagName('body')[0].appendChild(this.overlay);
        return this.overlay;
    }


    private setupModal () {
        if (this.modal !== undefined) {
            return this.modal;
        }

        this.modal = document.createElement('div');
        this.modal.id = 'seaters-modal';
        this.modal.style.marginLeft = 'auto 50%';
        this.modal.style.marginRight = 'auto 50%';
        this.modal.style.minHeight = '200px';
        this.modal.style.backgroundColor = '#fff';
        this.modal.style.borderRadius = '5px';
        this.modal.style.boxShadow = '2px 2px 5px #888888';
        this.modal.style.width = '332px';
        this.modal.style.margin = '0px auto';
        this.modal.style.marginTop = '200px';
        this.modal.style.padding = '8px';

        this.overlay.appendChild(this.modal);

        return this.modal;
    }

    /**
     * Check for required field
     * @param value
     * @returns {boolean}
     */
     validateRequired(value:string) {
      return value!=undefined && value.trim().length > 0;
    }

    /**
     * Hide all form field errors
     */
    resetFormErrors() {
      //Reset all errors
      var errorFields = this.modal.getElementsByClassName('strs-input-error');
      for (var i=0;i<errorFields.length;i++){
        (<HTMLElement>errorFields[i]).style.display = 'none';
      }
    }

    /**
     * Display a form field error
     * @param field
     * @param error
     */
    showFieldError(field:string, error:string) {
      var el = this.findElementById(field);
      el.innerHTML = error;
      (<HTMLElement>el).style.display = 'block';
    }

    /**
    * Client side form validation
    * @param validationErrors
    */
    showFormErrors(validationErrors) {
      //set errors that apply
      for (var i=0; i < validationErrors.length; i++) {
        var field = validationErrors[i].field+'-error';
        var error = validationErrors[i].error;
        this.showFieldError(field,error);
      }
    }

    showModal (style: string, onClose: () => void) {
        this.setupOverlay();
        this.setupModal();
        this.onClose = onClose;
        this.modalContent = <HTMLDivElement>document.createElement('div');
        var styleElement = <HTMLStyleElement>document.createElement('style');
        styleElement.innerHTML = style;
        this.modal.innerHTML = '';
        this.modal.appendChild(styleElement);
        this.modal.appendChild(this.modalContent);
        this.showOverlay();
    }

    setModalContent (html: string, style?: string) {
        this.modalContent.innerHTML = html;
        if (style) {
            var styleElement = <HTMLStyleElement>document.createElement('style');
            styleElement.innerHTML = style;
            this.modalContent.appendChild(styleElement);         
        }
    }

    closeModal () {
        this.hideOverlay();
        this.modal.innerHTML = '';
    }

    findElementByClass<T extends HTMLElement> (cssClass: string):T {
        return <T>this.modal.getElementsByClassName(cssClass)[0];
    }

    findElementByTagName<T extends HTMLElement> (tagName: string):T {
        return <T>this.modal.getElementsByTagName(tagName)[0];
    }

    findElementById<T extends HTMLElement> (id: string):T {
        return <T>document.getElementById(id);
    }

}
