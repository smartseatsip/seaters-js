import { Promise } from 'es6-promise';
import { TranslationStore, TranslationService, Locale } from './translation-service';
import { Array } from 'core-js/library';

declare var require: any;

const modalServiceCss = require('./modal-service.scss');

export class ModalService {

    private overlay: HTMLElement;

    private modal: HTMLElement;

    private modalContent: HTMLElement;

    private translationStore: TranslationStore;

    private locale: Locale = 'en';//TODO: via config

    private onClose: () => void;

    constructor (
        private translationService: TranslationService
    ) {
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
        this.overlay.style.display = 'flex';
    }

    private hideOverlay (invokeClose) {
        if (this.overlay.style.display === 'none') { return; }
        console.log('[ModalService] hiding seaters overlay');
        this.overlay.style.display = 'none';
        if (invokeClose && this.onClose) {
            this.onClose();
        }
    }

    private setupOverlay () {
        if (this.overlay !== undefined) {
            return this.overlay;
        }

        var modalServiceStyle = document.createElement('style');
        modalServiceStyle.innerHTML = modalServiceCss;

        var body = document.getElementsByTagName('body')[0];
        body.appendChild(modalServiceStyle);

        this.overlay = document.createElement('div');
        this.overlay.id = 'seaters-overlay';

        this.hideOverlay(false);// start hidden

        // register close actions
        this.overlay.onclick = (evt) => {
            if ((<HTMLElement>evt.target).id === this.overlay.id) {
                this.hideOverlay(true);
            }
        };
        this.onEscape(() => this.hideOverlay(true));

        body.appendChild(this.overlay);
        return this.overlay;
    }


    private setupModal () {
        if (this.modal !== undefined) {
            return this.modal;
        }

        this.modal = document.createElement('div');
        this.modal.id = 'seaters-modal';
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

    showModal (style: string, translationStore: TranslationStore, onClose: () => void) {
        this.setupOverlay();
        this.setupModal();
        this.translationStore = translationStore;
        this.onClose = onClose;
        var closeButton = <HTMLDivElement>document.createElement('div');
        closeButton.className = 'strs-modal-close medium';
        closeButton.onclick= ( () => this.hideOverlay(true));
        var poweredButton = <HTMLAnchorElement>document.createElement('a');
        poweredButton.className = 'strs-powered-button';
        poweredButton.href = "http://getseaters.com";
        poweredButton.target = "_blanc";
        this.modalContent = <HTMLDivElement>document.createElement('div');
        var styleElement = <HTMLStyleElement>document.createElement('style');
        styleElement.innerHTML = style;
        this.modal.innerHTML = '';
        this.modal.appendChild(styleElement);
        this.modal.appendChild(closeButton);
        this.modal.appendChild(this.modalContent);
        this.modal.appendChild(poweredButton);
        this.showOverlay();
    }

    private replaceTranslations () {
        var trlAttributeName = 'data-strs-trl';
        this.findElementsByAttributeName(this.modalContent, trlAttributeName).forEach(element => {
            element.innerHTML = this.translationService.translateFromStore(
                this.translationStore,
                element.getAttribute(trlAttributeName),
                this.locale
            );
        });
        var placeholderAttributeName = 'data-strs-placeholder';
        this.findElementsByAttributeName(this.modalContent, placeholderAttributeName).forEach(element => {
            (<HTMLInputElement> element).placeholder = this.translationService.translateFromStore(
                this.translationStore,
                element.getAttribute(placeholderAttributeName),
                this.locale
            )

        })
    }

    setModalContent (html: string, style?: string) {
        this.modalContent.innerHTML = html;
        this.replaceTranslations();
        this.modalContent.querySelector
        if (style) {
            var styleElement = <HTMLStyleElement>document.createElement('style');
            styleElement.innerHTML = style;
            this.modalContent.appendChild(styleElement);
        }
    }

    closeModal () {
        this.hideOverlay(true);
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

    findElementsByAttributeName<T extends HTMLElement> (root: HTMLElement, attributeName: string): T[] {
        var elements = [];
        function loopChildren (element: HTMLElement) {
            Array.from(element.childNodes).forEach(child => {
                if (child instanceof HTMLElement) {
                    if (child.attributes[attributeName]) {
                        elements.push(child);
                    }
                    return loopChildren(child);
                }
            });
        }
        loopChildren(root);
        return elements;
    }

}
