var shared = require('./_shared');

shared.client.fanService.getFanGroups(['locked-fg', 'unlocked-fg'])
  .then(fanGroups => console.log(fanGroups))
  .then(shared.exitOK, shared.exitFail);
