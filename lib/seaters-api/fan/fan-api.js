"use strict";
var api_1 = require('../../api');
var FanApi = (function () {
    function FanApi(apiContext) {
        this.apiContext = apiContext;
        this.rootEp = '/fan';
        this.fgEp = this.rootEp + '/groups/:fanGroupId';
        this.wlEp = this.rootEp + '/waiting-lists/:waitingListId';
    }
    FanApi.prototype.fan = function () {
        return this.apiContext.get(this.rootEp);
    };
    FanApi.prototype.fgEndpointParams = function (fanGroupId) {
        return api_1.ApiContext.buildEndpointParams({ fanGroupId: fanGroupId });
    };
    FanApi.prototype.fanGroup = function (fanGroupId) {
        return this.apiContext.get(this.fgEp, this.fgEndpointParams(fanGroupId));
    };
    FanApi.prototype.joinFanGroup = function (fanGroupId) {
        return this.apiContext.post(this.fgEp, null, this.fgEndpointParams(fanGroupId));
    };
    FanApi.prototype.wlEndpointParams = function (waitingListId) {
        return api_1.ApiContext.buildEndpointParams({ waitingListId: waitingListId });
    };
    FanApi.prototype.waitingList = function (waitingListId) {
        return this.apiContext.get(this.wlEp, this.wlEndpointParams(waitingListId));
    };
    FanApi.prototype.joinWaitingList = function (waitingListId, numberOfSeats) {
        return this.apiContext.post(this.wlEp + '/position', {
            numberOfSeats: numberOfSeats
        }, this.wlEndpointParams(waitingListId));
    };
    return FanApi;
}());
exports.FanApi = FanApi;
