var shared = require('../shared');

var client = shared.client();
var wlIds = ['aa4a607e-4b23-4b23-b59d-f65d4b1a22ed', '4bc07cc5-674a-4a17-a1d8-821b4227b71e'];

client.publicService.getFanGroups(wlIds)
  .then((res) => console.log('Public FGs', res))
  .then(shared.exitOK, shared.exitFail);
