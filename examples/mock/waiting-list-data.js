/**
 * Fetching WL related data
 *  - event description
 * Assumes the fan is logged in.
 */
var shared = require('./_shared');

var currentLocale = 'nl';
var DEFAULT_LOCALE = 'fr';

Promise.resolve()

  .then(() => Promise.all([
    shared.client.fanService.getEventDescriptionForWaitingList('a-wlid'),
    shared.client.fanService.getVenueConditionsForWaitingList('a-wlid')
  ]))
  .then(data => {
    var eventDescription = data[0];
    var venueConditions = data[1];

    // print out the translated event description and venue conditions
    console.log('event description: "%s"', eventDescription.localize(currentLocale, DEFAULT_LOCALE));
    console.log('venue conditions: "%s"', venueConditions.localize(currentLocale, DEFAULT_LOCALE));

    // if for some reason you want to write your own localize function, all available translations
    // can be retrieved by indexing the LocalizableText object on locale
    console.log('event description in russian locale: "%s"', eventDescription.ru);
  })
  .then(shared.exitOK, shared.exitFail);
