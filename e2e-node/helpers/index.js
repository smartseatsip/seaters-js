var helpers = [
    require('./client-helper'),
    require('./matching-helper'),
    require('./debug-helper'),
    require('./randomdata-helper')
];

var exports = {};

helpers.forEach(helper => {
    Object.keys(helper).forEach(k => {
        exports[k] = global[k] = helper[k];
    });
});

module.exports = exports;
