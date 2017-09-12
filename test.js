var SeatersSDK = require('./dist/seaters.module');
var client = new SeatersSDK.SeatersClient({
  apiPrefix: 'http://localhost:8080/api',
  requestDriver: 'NODE'
});

client.profilingService.updateUserInterest({
  id: '63897b62-547f-4f70-ba91-a928e88420b7',
  state: 'like',
  version: 1
}).then(function (response) {
  console.log('Created interest', response);
}).catch(function (err) {
  console.log(err);
});
