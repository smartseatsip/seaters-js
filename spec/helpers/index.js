var helpers = [
    require('./client-helper'),
    require('./matching-helper')
];

var exports = {};

helpers.forEach(helper => {
    Object.keys(helper).forEach(k => {
        exports[k] = global[k] = helper[k];
    });
});

module.exports = exports;