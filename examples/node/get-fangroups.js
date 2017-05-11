var shared = require('../shared');
var client = shared.client('https://api.dev-seaters.com/api');

client.fanService.getFanGroups(['locked-fg', 'unlocked-fg'])
  .then(fanGroups => console.log(fanGroups))
  .then(shared.exitOK, shared.exitFail);
