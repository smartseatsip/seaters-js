var shared = require('./_shared');

/***
 * Assumptions:
 * - the WL has some attendee required info setup
 * - the user is logged in
 * - the user has seats assigned waiting to be accepted for this WL
 * - the user has not supplied billing information yet
 * - the user has not submitted attendee info yet for this WL
 */

/**
 * Check the status of attendees info
 */
function logAttendeesInfo(wl) {
    console.log('Should we still provide attendee info? %s', wl.shouldProvideAttendeesInfo ? 'yes': 'no');
    if(!wl.shouldProvideAttendeesInfo) {
        console.log('attendees info');
        console.log(wl.position.attendeesInfo);
    }
}

/**
 * Method will gather attendee info from the enduser; for example via a form in a modal.
 * In this example it will simply populate all properties with random data.
 */
function gatherAttendeesInfo(wl) {
    // Typically you will look at wl.eventRequiredAttendeeInfo to see which fields you need to supply
    // All fields are optional by default, fields inside wl.eventRequiredAttendeeInfo are mandatory.
    console.log('Gathering attendees info: %s', JSON.stringify(wl.eventRequiredAttendeeInfo));

    return {
        attendees: Array.from(new Array(wl.position.numberOfSeats)).map((_x, i) => {
            var attendeeInfo = {};
            wl.eventRequiredAttendeeInfo.forEach(property => attendeeInfo[property] = randomData(property, i));
            return attendeeInfo;
        })
    };
}

function randomData(property,idx) {
    // predefined properties can be any of EVENT_REQUIRED_ATTENDEE_INFO
    // To keep the example simple we only support title, firstName, lastName, for the rest we supply null
    switch(property) {
        case 'title': return 'MR';
        case 'firstName': return 'Pluto'+idx;
        case 'lastName': return 'Bear'+idx;
        default:
            console.warn('Unsupported property for example: %s', property);
            return null;
    }
}

var wlId = 'checkout-wlid';


Promise.resolve()
.then(() => shared.client.fanService.getWaitingList(wlId))
.then(wl => {
    logAttendeesInfo(wl);
    if(!wl.shouldProvideAttendeesInfo) {
        // handle the case where attendees info is not required
        return Promise.reject('invalid mock setup');
    } else {
        return Promise.resolve(gatherAttendeesInfo(wl));
    }
})
.then(attendeesInfo => shared.client.fanService.saveAttendeesInfo(wlId, attendeesInfo))
.then(wl => logAttendeesInfo(wl))
.then(shared.exitOK, shared.exitFail);