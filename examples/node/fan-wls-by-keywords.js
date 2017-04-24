/**
 * Get the WLs with the fan's status for these WLs within a fan group
 *
 *
 * minimum SDK version: 1.16.0
 */

var shared = require('../shared');

var sdk = shared.sdk;

shared.fanClient().then(client => {

  return client.fanService.getWaitingListsByKeywords(['Sprite12'], { page: 0, maxPageSize: 10 })
    .then(wls => {

      console.log(
        'found %s results, showing results %s to %s',
        wls.totalSize,
        wls.totalSize === 0 ? 0 : wls.itemOffset + 1,
        Math.min(wls.itemOffset + wls.maxPageSize, wls.totalSize)
      );

      wls.items.forEach((wl, i) => {
        console.log('[%s] WaitingList: %s - %s (%s) @ %s - %s => %s',
          i + 1,
          wl.groupSlug,
          wl.translatedEventName,
          wl.eventStartDate,
          wl.translatedVenueName,
          wl.displayName,
          sdk.fan.WAITING_LIST_ACTION_STATUS[wl.actionStatus]
        );
      });
    });

})
  .then(shared.exitOK, shared.exitFail);
