var SeatersSDK = require('./dist/seaters.module');
var client = new SeatersSDK.SeatersClient({
  apiPrefix: 'http://localhost:8080/api',
  requestDriver: 'NODE'
});

client.profilingService.getCategories().then(function (response) {
  console.log(response);
}).catch(function (err) {
  console.log(err);
});

client.profilingService.getCategoryById('d3975a37-9b0f-42da-9ab7-8d3189a98a53').then(function (response) {
  console.log(response);
}).catch(function (err) {
  console.log(err);
});
