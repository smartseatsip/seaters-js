var sdk = require('./dist/seaters.module');

console.log('Seaters SDK v%s', sdk.version);

var c = new sdk.SeatersClient('https://api.dev-seaters.com/api');

c.test();


