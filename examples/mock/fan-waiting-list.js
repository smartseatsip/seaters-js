/**
 * Fetching WL related data for a given fan
 * Assumes the fan is logged in.
 */
var shared = require('./_shared');

var page = { maxPageSize: 10, itemOffset: 0 };
function wlActionStatus(idx) {
  return shared.sdk.fan.WAITING_LIST_ACTION_STATUS[idx];
}

Promise.resolve()

  .then(() => console.log('\nfetching my WLs without a seat'))
  .then(() => shared.client.fanService.getMyWaitingListsWithoutSeat(page))
  .then((wls) => {
    wls.items.forEach(wl => console.log('%s => %s', wl.translatedEventName, wlActionStatus(wl.actionStatus)));
  })

  .then(() => console.log('\nfetching my WLs with a seat'))
  .then(() => shared.client.fanService.getMyWaitingListsWithSeat(page))
  .then((wls) => {
    wls.items.forEach(wl => console.log('%s => %s', wl.translatedEventName, wlActionStatus(wl.actionStatus)));
  })

  .then(shared.exitOK, shared.exitFail);
