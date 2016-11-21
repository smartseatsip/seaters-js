"use strict";
var core = require('core-js/library');
var seaters_api_1 = require('./seaters-api');
var session_service_1 = require('./services/session-service');
var wl_service_1 = require('./services/wl-service');
var modal_service_1 = require('./services/modal-service');
var jwl_flow_service_1 = require('./services/join-wl/jwl-flow-service');
var SeatersClient = (function () {
    function SeatersClient(options) {
        options = core.Object.assign({}, SeatersClient.DEFAULT_OPTIONS, options);
        this.api = new seaters_api_1.SeatersApi(options.apiPrefix);
        this.sessionService = new session_service_1.SessionService(this.api);
        this.wlService = new wl_service_1.WlService(this.api);
        this.modalService = new modal_service_1.ModalService();
        this.jwlFlowService = new jwl_flow_service_1.JWLFlowService(this.modalService, this.sessionService);
    }
    SeatersClient.DEFAULT_OPTIONS = {
        apiPrefix: '${api.location}'
    };
    return SeatersClient;
}());
exports.SeatersClient = SeatersClient;
exports.getSeatersClient = (function () {
    var client = undefined;
    return function (options) {
        if (client === undefined) {
            client = new SeatersClient(options);
        }
        return client;
    };
})();
