var shared = require('./shared');

shared.client.fanService.fanGroupService.joinProtectedFanGroup('locked-fg', 'invalid code')
.then(fg => console.log('unlocked fg', fg))
.then(shared.exitOK, shared.exitFail);