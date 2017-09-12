var SeatersSDK = require('./dist/seaters.module');
var client = new SeatersSDK.SeatersClient({
  apiPrefix: 'http://localhost:8080/api',
  requestDriver: 'NODE'
});

client.fanService.getFanInterests().then(function (response) {
  console.log('Fan interests = ', response);
}).catch(function (err) {
  console.log(err);
});
