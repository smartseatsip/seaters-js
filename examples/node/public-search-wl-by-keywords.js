/**
 * Search public Seaters WLs by keywords
 * 
 * All WLs tagged with the given keywords will be returned
 * 
 * minimum SDK version: 1.15.0
 */

var shared = require('../shared');

var client = shared.client('https://api.dev-seaters.com/api');

var page = undefined;//you can specify maxPageSize and itemOffset

client.publicService.getWaitingListsByKeywords(['Sprite12'], page)
.then(res => {
    console.log(
        'found %s results, showing results %s to %s',
        res.totalSize,
        res.totalSize === 0 ? 0 : res.itemOffset + 1,
        Math.min(res.itemOffset + res.maxPageSize, res.totalSize)
    );
    res.items.forEach((content, i) => {
        if(content.type !== 'WAITING_LIST') {
            console.error('unknown content type: %s', content.type);
            return;
        }

        console.log('[%s] WaitingList: %s - %s (%s) @ %s - %s',
            i+1,
            content.groupSlug,
            content.eventName['en'],
            content.eventStartDate,
            content.venueName['en'],
            content.displayName
        );
        
    });
})
.then(shared.exitOK, shared.exitFail);