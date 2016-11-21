"use strict";
var core = require('core-js/library');
var FanApi = (function () {
    function FanApi(apiContext) {
        this.apiContext = apiContext;
    }
    //TODO: apiContext endpoint params should be implemented first
    FanApi.prototype.waitinglist = function (waitingListId) {
        var endpointParams = new core.Map();
        endpointParams.set('listId', waitingListId);
        return this.apiContext.get('/fan/waiting-lists', endpointParams, null);
    };
    return FanApi;
}());
exports.FanApi = FanApi;
