/**
 * Fetching WL related data
 *  - event description
 * Assumes the fan is logged in.
 */
var shared = require('./_shared');

var currentLocale = 'nl';
var DEFAULT_LOCALE = 'en';

function getLocalizedText (translationMap) {
    if(translationMap.hasOwnProperty(currentLocale)) {
        return translationMap[currentLocale];
    } else {
        return translationMap[DEFAULT_LOCALE];
    }
}

Promise.resolve()

.then(() => shared.client.fanService.getEventDescriptionForWaitingList('a-wlid'))
.then((eventDescription) => {
    console.log('event description in %s: "%s"', currentLocale, getLocalizedText(eventDescription));
})
.then(shared.exitOK, shared.exitFail);
