var SeatersSDK = require('../../lib');
var apiLocation = process.env.API_LOCATION || 'https://api.dev-seaters.com/api';
var client = new SeatersSDK.SeatersClient(apiLocation);

module.exports = {
    SeatersSDK: SeatersSDK,
    client: client
};