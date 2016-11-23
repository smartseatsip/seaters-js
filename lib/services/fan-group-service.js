"use strict";
var util_1 = require('./util');
var library_1 = require('core-js/library');
(function (FAN_GROUP_ACTION_STATUS) {
    FAN_GROUP_ACTION_STATUS[FAN_GROUP_ACTION_STATUS["CAN_JOIN"] = 0] = "CAN_JOIN";
    FAN_GROUP_ACTION_STATUS[FAN_GROUP_ACTION_STATUS["CAN_LEAVE"] = 1] = "CAN_LEAVE";
    FAN_GROUP_ACTION_STATUS[FAN_GROUP_ACTION_STATUS["CAN_UNLOCK"] = 2] = "CAN_UNLOCK";
    FAN_GROUP_ACTION_STATUS[FAN_GROUP_ACTION_STATUS["CAN_REQUEST"] = 3] = "CAN_REQUEST";
    FAN_GROUP_ACTION_STATUS[FAN_GROUP_ACTION_STATUS["WAITING_FOR_APPROVAL"] = 4] = "WAITING_FOR_APPROVAL";
})(exports.FAN_GROUP_ACTION_STATUS || (exports.FAN_GROUP_ACTION_STATUS = {}));
var FAN_GROUP_ACTION_STATUS = exports.FAN_GROUP_ACTION_STATUS;
var FanGroupService = (function () {
    function FanGroupService(api) {
        this.api = api;
    }
    FanGroupService.prototype.getFanGroup = function (fanGroupId) {
        return this.api.fan.fanGroup(fanGroupId);
    };
    FanGroupService.prototype.getFanGroupActionStatus = function (fanGroup) {
        var membership = fanGroup.membership;
        if (membership.member) {
            return FAN_GROUP_ACTION_STATUS.CAN_LEAVE;
        }
        else if (fanGroup.accessMode === 'PUBLIC' ||
            (membership.request && membership.request.status === 'ACCEPTED')) {
            return FAN_GROUP_ACTION_STATUS.CAN_JOIN;
        }
        else if (membership.request &&
            membership.request.status === 'PENDING') {
            return FAN_GROUP_ACTION_STATUS.WAITING_FOR_APPROVAL;
        }
        else if (fanGroup.accessMode === 'CODE_PROTECTED' ||
            fanGroup.accessMode === 'PRIVATE') {
            return FAN_GROUP_ACTION_STATUS.CAN_UNLOCK;
        }
        // state that was not implemented
        console.error('GroupService - unhandled group status', JSON.stringify(fanGroup));
    };
    FanGroupService.prototype.getExtendedFanGroup = function (fanGroupId) {
        var _this = this;
        return this.getFanGroup(fanGroupId)
            .then(function (fg) { return library_1.Object.assign(fg, {
            actionStatus: _this.getFanGroupActionStatus(fg)
        }); });
    };
    FanGroupService.prototype.joinFanGroup = function (fanGroupId) {
        var _this = this;
        return this.api.fan.joinFanGroup(fanGroupId)
            .then(function () {
            return util_1.retryUntil(function () { return _this.getExtendedFanGroup(fanGroupId); }, function (fg) { return fg.actionStatus === FAN_GROUP_ACTION_STATUS.CAN_LEAVE; }, 10, 1000);
        });
    };
    return FanGroupService;
}());
exports.FanGroupService = FanGroupService;
