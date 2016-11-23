"use strict";
var seaters_client_1 = require('./seaters-client');
function joinWl(wlId) {
    var client = seaters_client_1.getSeatersClient();
    return client.jwlFlowService.startFlow(wlId);
}
exports.joinWl = joinWl;
