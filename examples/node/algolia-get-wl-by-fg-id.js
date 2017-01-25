var SeatersSDK = require('../../dist/seaters.module.js');
console.log('SeatersSDK v%s\n----------------\n', SeatersSDK.version);

var client = new SeatersSDK.SeatersClient({
    requestDriver: 'NODE'
});
var fgId = '6f065198-a9e0-4702-ae13-7c3acab5aef4';//'fc25df56-85b2-492f-8f12-c6b197491adb';
client.algoliaForSeatersService.getWishlistsByFangroupId (fgId, 10, 0).then(
    res => console.log(res),
    err => {
        if(err.error) {
            console.error('error on algolia search: %s => %s', err.error, err.errorMsg);
        } else {
            console.error('error on algolia search', err);
        }
    }
);