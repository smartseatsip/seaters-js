"use strict";
var seaters_api_1 = require('./seaters-api');
var session_service_1 = require('./services/session-service');
var wl_service_1 = require('./services/wl-service');
var modal_service_1 = require('./services/modal-service');
var join_wl_service_1 = require('./services/join-wl-service');
var join_wl_service_2 = require('./services/join-wl/join-wl-service');
var SeatersClient = (function () {
    function SeatersClient(apiPrefix) {
        this.api = new seaters_api_1.SeatersApi(apiPrefix || '/api' /*'https://api.dev-seaters.com/api'*/);
        this.sessionService = new session_service_1.SessionService(this.api);
        this.wlService = new wl_service_1.WlService(this.api);
        this.modalService = new modal_service_1.ModalService();
        this.joinWlService = new join_wl_service_1.JoinWlService(this.wlService, this.sessionService);
        this.joinWlService2 = new join_wl_service_2.JoinWlService(this.modalService, this.wlService, this.sessionService);
    }
    return SeatersClient;
}());
exports.SeatersClient = SeatersClient;
