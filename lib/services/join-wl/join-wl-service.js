"use strict";
var JoinWlService = (function () {
    function JoinWlService(modalService, wlService, sessionService) {
        this.modalService = modalService;
        this.wlService = wlService;
        this.sessionService = sessionService;
    }
    JoinWlService.prototype.setupTest = function () {
        var _this = this;
        this.modalService.showModal(require('./test.html'), require('./test.css'));
        var joinBtn = this.modalService.findElementByClass('strs-join-button');
        joinBtn.onclick = function () { return _this.setupTest2(); };
    };
    JoinWlService.prototype.setupTest2 = function () {
        this.modalService.showModal(require('./test2.html'), require('./test2.css'));
    };
    JoinWlService.prototype.joinWl = function (wlId) {
        console.log('launching JoinWl popup for %s', wlId);
        this.setupTest();
    };
    return JoinWlService;
}());
exports.JoinWlService = JoinWlService;
