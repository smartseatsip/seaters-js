var shared = require('./_shared');

shared.client.fanService.waitingListService.joinProtectedWaitingList('locked-wl', 'invalid code', 1)
  .then(wl => console.log('unlocked wl', wl))
  .catch(e => {
    if (e === 'strs.api.wl.invalidcode') {
      console.log('Failed to unlock', e);
    } else {
      throw e;
    }
  })
  .then(() => shared.client.fanService.waitingListService.joinProtectedWaitingList('locked-wl', 'valid code', 1))
  .then(shared.exitOK, shared.exitFail);
