"use strict";
var core = require('core-js/library');
var PagingOptions = (function () {
    function PagingOptions(itemOffset, maxPageSize) {
        this.itemOffset = itemOffset;
        this.maxPageSize = maxPageSize;
    }
    PagingOptions.toQueryParams = function (pagingOptions, queryParams) {
        if (!queryParams) {
            queryParams = new core.Map();
        }
        if (!pagingOptions) {
            return queryParams;
        }
        if (pagingOptions.itemOffset) {
            queryParams.set('itemOffset', pagingOptions.itemOffset.toString());
        }
        if (pagingOptions.maxPageSize) {
            queryParams.set('maxPageSize', pagingOptions.maxPageSize.toString());
        }
        return queryParams;
    };
    return PagingOptions;
}());
exports.PagingOptions = PagingOptions;
