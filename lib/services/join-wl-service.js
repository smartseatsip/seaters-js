/// <reference path="../../node_modules/typescript/lib/lib.d.ts" />
"use strict";
var JoinWlService = (function () {
    function JoinWlService(wlService, sessionService) {
        this.wlService = wlService;
        this.sessionService = sessionService;
    }
    JoinWlService.prototype.onEscape = function (callback) {
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
    JoinWlService.prototype.showOverlay = function () {
        console.log('showing seaters overlay');
        this.overlay.style.display = 'block';
    };
    JoinWlService.prototype.hideOverlay = function () {
        console.log('hiding seaters overlay');
        this.overlay.style.display = 'none';
    };
    JoinWlService.prototype.setupOverlay = function () {
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
    JoinWlService.prototype.setupModal = function () {
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
    JoinWlService.prototype.setupIframe = function () {
        if (this.iframe) {
            return this.iframe;
        }
        this.iframe = document.createElement('iframe');
        this.iframe.id = 'seaters-iframe';
        this.iframe.src = '/components/join-wl-button';
        this.iframe.style.border = '0';
        this.iframe.style.width = '100%';
        this.iframe.style.height = '100%';
        this.modal.appendChild(this.iframe);
        return this.iframe;
    };
    JoinWlService.prototype.setupLoginScreen = function () {
        var modal = this.modal;
        var loginScreen = document.createElement('button');
        loginScreen.innerHTML = 'Click me!';
        loginScreen.onclick = function () {
            modal.innerHTML = 'second screen';
        };
        this.modal.appendChild(loginScreen);
    };
    JoinWlService.prototype.joinWl = function (wlId) {
        this.setupOverlay();
        this.setupModal();
        this.setupLoginScreen();
        // this.setupIframe();
        // this.showOverlay();
        // console.log('launching JoinWl popup for %s', wlId);
    };
    return JoinWlService;
}());
exports.JoinWlService = JoinWlService;
