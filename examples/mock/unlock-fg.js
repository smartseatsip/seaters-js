var shared = require('./_shared');

shared.client.fanService.joinProtectedFanGroup('locked-fg', 'invalid code')
  .then(fg => console.log('unlocked fg', fg))
  .then(shared.exitOK, shared.exitFail);
