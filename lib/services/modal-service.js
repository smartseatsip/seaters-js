/// <reference path="../../node_modules/typescript/lib/lib.d.ts" />
"use strict";
var ModalService = (function () {
    function ModalService() {
    }
    ModalService.prototype.onEscape = function (callback) {
        function escapeListener(evt) {
            if (evt.key == 'Escape') {
                callback();
                evt.preventDefault();
            }
        }
        function removeEscapeListener() {
            window.removeEventListener('keydown', escapeListener, true);
        }
        window.addEventListener('keydown', escapeListener, true);
        return removeEscapeListener;
    };
    ModalService.prototype.showOverlay = function () {
        console.log('showing seaters overlay');
        this.overlay.style.display = 'block';
    };
    ModalService.prototype.hideOverlay = function () {
        console.log('hiding seaters overlay');
        this.overlay.style.display = 'none';
    };
    ModalService.prototype.setupOverlay = function () {
        var _this = this;
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
        this.onEscape(function () { return _this.hideOverlay(); });
        document.getElementsByTagName('body')[0].appendChild(this.overlay);
        return this.overlay;
    };
    ModalService.prototype.setupModal = function () {
        if (this.modal !== undefined) {
            return this.modal;
        }
        this.modal = document.createElement('div');
        this.modal.id = 'seaters-modal';
        this.modal.style.marginLeft = 'auto 50%';
        this.modal.style.marginRight = 'auto 50%';
        this.modal.style.minHeight = '300px';
        this.modal.style.backgroundColor = '#fff';
        this.modal.style.borderRadius = '5px';
        this.modal.style.boxShadow = '2px 2px 5px #888888';
        this.modal.style.width = '332px';
        this.modal.style.margin = '0px auto';
        this.modal.style.marginTop = '200px';
        this.modal.style.padding = '8px';
        this.overlay.appendChild(this.modal);
        return this.modal;
    };
    ModalService.prototype.showModal = function (template, style) {
        this.setupOverlay();
        this.setupModal();
        this.modal.innerHTML = template;
        var styleElement = document.createElement('style');
        styleElement.innerHTML = style;
        this.modal.appendChild(styleElement);
        this.showOverlay();
    };
    ModalService.prototype.closeModal = function () {
        this.hideOverlay();
        this.modal.innerHTML = '';
    };
    ModalService.prototype.findElementByClass = function (cssClass) {
        return this.modal.getElementsByClassName(cssClass)[0];
    };
    ModalService.prototype.findElementByTagName = function (tagName) {
        return this.modal.getElementsByTagName(tagName)[0];
    };
    ModalService.prototype.findElementById = function (id) {
        return document.getElementById(id);
    };
    return ModalService;
}());
exports.ModalService = ModalService;
