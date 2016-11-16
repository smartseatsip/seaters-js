"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var api = require('../api');
var app_api_1 = require('./app/app-api');
var fan_api_1 = require('./fan/fan-api');
var authentication_api_1 = require('./authentication/authentication-api');
var SeatersApi = (function (_super) {
    __extends(SeatersApi, _super);
    function SeatersApi(prefix) {
        _super.call(this, prefix);
        this.prefix = prefix;
        this.app = new app_api_1.AppApi(this);
        this.fan = new fan_api_1.FanApi(this);
        this.authentication = new authentication_api_1.AuthenticationApi(this);
    }
    return SeatersApi;
}(api.ApiContext));
exports.SeatersApi = SeatersApi;
