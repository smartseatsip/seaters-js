var shared = require('../shared');
var client = shared.client('https://api.dev-seaters.com/api');

client.fanService.getFanGroups(['b3e5d422-5027-4a7f-b2b7-4913fc5949b1', '7fe32c7a-0dc8-4652-aabb-7442bf618bad'])
  .then(fanGroups => console.log(fanGroups))
  .then(shared.exitOK, shared.exitFail);
