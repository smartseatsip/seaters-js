var shared = require('../shared');

var client = shared.client();
var wlIds = ['700b1e95-db19-470f-bb30-186143551c2b', '99896a68-8a5d-48e4-947c-a344121b4316'];

client.publicService.getFanGroups(wlIds)
  .then((res) => console.log('Public FGs', res))
  .then(shared.exitOK, shared.exitFail);
