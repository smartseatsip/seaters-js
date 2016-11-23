"use strict";
var core = require('core-js/library');
var util_1 = require('./util');
(function (WAITING_LIST_ACTION_STATUS) {
    WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["UNLOCK"] = 0] = "UNLOCK";
    WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["SOON"] = 1] = "SOON";
    WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["BOOK"] = 2] = "BOOK";
    WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["WAIT"] = 3] = "WAIT";
    WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["CONFIRM"] = 4] = "CONFIRM";
    WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["GO_LIVE"] = 5] = "GO_LIVE";
    WAITING_LIST_ACTION_STATUS[WAITING_LIST_ACTION_STATUS["ERROR"] = 6] = "ERROR";
})(exports.WAITING_LIST_ACTION_STATUS || (exports.WAITING_LIST_ACTION_STATUS = {}));
var WAITING_LIST_ACTION_STATUS = exports.WAITING_LIST_ACTION_STATUS;
var WaitingListService = (function () {
    function WaitingListService(api) {
        this.api = api;
    }
    WaitingListService.prototype.getWaitingList = function (waitingListId) {
        return this.api.fan.waitingList(waitingListId);
    };
    WaitingListService.prototype.getWaitingListActionStatus = function (waitingList) {
        var seat = waitingList.seat;
        var position = waitingList.position;
        var request = waitingList.request;
        // Comming soon
        if (waitingList.waitingListStatus === 'PUBLISHED') {
            return WAITING_LIST_ACTION_STATUS.SOON;
        }
        // Not in WL
        if (!position) {
            // Code protected WL
            if (waitingList.accessMode === 'CODE_PROTECTED') {
                if (!request) {
                    return WAITING_LIST_ACTION_STATUS.UNLOCK;
                }
                else if (request.status === 'PENDING') {
                    return WAITING_LIST_ACTION_STATUS.UNLOCK; //-PENDING
                }
                else if (request.status === 'REJECTED') {
                    return WAITING_LIST_ACTION_STATUS.UNLOCK;
                }
                else if (request.status === 'ACCEPTED') {
                    return WAITING_LIST_ACTION_STATUS.BOOK;
                }
                else {
                    console.error('[WaitingListService] - unexpected request status: %s', request.status);
                    return WAITING_LIST_ACTION_STATUS.ERROR;
                }
            }
            else if (waitingList.accessMode === 'PUBLIC') {
                return WAITING_LIST_ACTION_STATUS.BOOK;
            }
            else {
                console.error('[WaitingListService] - unexpected accessMode: %s', waitingList.accessMode);
                return WAITING_LIST_ACTION_STATUS.ERROR;
            }
        }
        // In WL
        if (position.status === 'WAITING_SEAT') {
            return WAITING_LIST_ACTION_STATUS.WAIT;
        }
        // In WL with seat
        if (position.status === 'HAS_SEAT') {
            if (seat) {
                if (seat.status === 'ASSIGNED') {
                    // free WL
                    if (waitingList.freeWaitingList) {
                        return WAITING_LIST_ACTION_STATUS.CONFIRM;
                    }
                    else if (!position.transactionStatus) {
                        return WAITING_LIST_ACTION_STATUS.CONFIRM;
                    }
                    else if (['FAILURE', 'CANCELLED', 'REFUNDED'].indexOf(position.transactionStatus) >= 0) {
                        return WAITING_LIST_ACTION_STATUS.CONFIRM;
                    }
                    else if (['CREATING', 'CREATED', 'APPROVED', 'REFUNDING'].indexOf(position.transactionStatus) >= 0) {
                        return WAITING_LIST_ACTION_STATUS.CONFIRM; //-PENDING
                    }
                    else {
                        console.error('[WaitingListService] - unexpected transactionStatus: %s', position.transactionStatus);
                        return WAITING_LIST_ACTION_STATUS.ERROR;
                    }
                }
                else if (waitingList.seatDistributionMode === 'TICKET' && seat.ticketingSystemType) {
                    return WAITING_LIST_ACTION_STATUS.CONFIRM; //-PENDING
                }
                else if (seat.status === 'ACCEPTED') {
                    return WAITING_LIST_ACTION_STATUS.GO_LIVE;
                }
                else {
                    console.error('[WaitingListService] unexpected seat status: %s', seat.status);
                    return WAITING_LIST_ACTION_STATUS.ERROR;
                }
            }
            else {
                console.error('[WaitingListService] has seat without actual seat');
                return WAITING_LIST_ACTION_STATUS.ERROR;
            }
        }
        else if (position.status === 'BEING_PROCESSED') {
            return WAITING_LIST_ACTION_STATUS.WAIT; //-PENDING
        }
        else {
            console.error('[WaitinglistService] unexpected position status: %s', position.status);
            return WAITING_LIST_ACTION_STATUS.ERROR;
        }
    };
    WaitingListService.prototype.getExtendedWaitingList = function (waitingListId) {
        var _this = this;
        return this.getWaitingList(waitingListId)
            .then(function (wl) { return core.Object.assign(wl, {
            actionStatus: _this.getWaitingListActionStatus(wl)
        }); });
    };
    WaitingListService.prototype.joinWaitingList = function (waitingListId, numberOfSeats) {
        var _this = this;
        return this.api.fan.joinWaitingList(waitingListId, numberOfSeats)
            .then(function () {
            return util_1.retryUntil(function () { return _this.getExtendedWaitingList(waitingListId); }, function (fg) { return fg.actionStatus !== WAITING_LIST_ACTION_STATUS.BOOK; }, 10, 1000);
        });
    };
    return WaitingListService;
}());
exports.WaitingListService = WaitingListService;
