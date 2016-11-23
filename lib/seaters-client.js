"use strict";
var core = require('core-js/library');
var seaters_api_1 = require('./seaters-api');
var session_service_1 = require('./services/session-service');
var waiting_list_service_1 = require('./services/waiting-list-service');
var fan_group_service_1 = require('./services/fan-group-service');
var modal_service_1 = require('./services/modal-service');
var jwl_flow_service_1 = require('./services/join-wl/jwl-flow-service');
var SeatersClient = (function () {
    function SeatersClient(options) {
        options = core.Object.assign({}, SeatersClient.DEFAULT_OPTIONS, options);
        this.api = new seaters_api_1.SeatersApi(options.apiPrefix);
        this.sessionService = new session_service_1.SessionService(this.api);
        this.waitingListService = new waiting_list_service_1.WaitingListService(this.api);
        this.fanGroupService = new fan_group_service_1.FanGroupService(this.api);
        this.modalService = new modal_service_1.ModalService();
        this.jwlFlowService = new jwl_flow_service_1.JwlFlowService(this.modalService, this.sessionService, this.waitingListService, this.fanGroupService);
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
