var shared = require('./_shared');

shared.client.fanService.waitingListService.joinProtectedWaitingList('locked-wl', 'invalid code')
  .then(wl => console.log('unlocked wl', wl))
  .catch(e => {
    if (e === 'strs.api.wl.invalidcode') {
      console.log('Failed to unlock', e);
    } else {
      throw e;
    }
  })
  .then(() => shared.client.fanService.waitingListService.joinProtectedWaitingList('locked-wl', 'valid code'))
  .then(shared.exitOK, shared.exitFail);
