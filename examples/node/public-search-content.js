/**
 * Search public Seaters content
 *
 * minimum SDK version: 1.14.0
 */

var shared = require('../shared');

var client = shared.client('https://api.dev-seaters.com/api');

client.publicService.searchSeatersContent('WHOLOLO', 'en')
  .then((res) => {
    console.log(
      'found %s results, showing results %s to %s',
      res.totalSize,
      res.totalSize === 0 ? 0 : res.itemOffset + 1,
      Math.min(res.itemOffset + res.maxPageSize, res.totalSize)
    );
    res.items.forEach((content, i) => {
      // Content: SeatersContent = FanGroup | WaitingList
      if (content.type === 'WAITING_LIST') {
        console.log('[%s] WaitingList: %s - %s (%s) @ %s - %s',
          i + 1,
          content.groupSlug,
          content.eventName.en,
          content.eventStartDate,
          content.venueName.en,
          content.displayName
        );
      } else if (content.type === 'FAN_GROUP') {
        console.log('[%s] FanGroup: seaters.com/%s - %s',
          i + 1,
          content.slug,
          content.name.en
        );
      } else {
        console.error('unknown content type: %s', content.type);
      }
    });
  })
  .then(shared.exitOK, shared.exitFail);
