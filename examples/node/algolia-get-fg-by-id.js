var SeatersSDK = require('../../dist/seaters.module.js');
console.log('SeatersSDK v%s\n----------------\n', SeatersSDK.version);

var client = new SeatersSDK.SeatersClient();
var fgId = 'fc25df56-85b2-492f-8f12-c6b197491adb';
client.algoliaForSeatersService.getFangroupById(fgId).then(
    res => console.log(res),
    err => console.error('error on algolia search', err)
);