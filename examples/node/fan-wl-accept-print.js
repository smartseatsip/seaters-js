/**
 * Accept seats and print the voucher
 * 
 * Prerequisites: the fan must be in wl and have tickets assigned
 * through the cockpit
 * 
 * minimum SDK version: 1.3.4
 */

var shared = require('../shared');

var fgId = shared.fgId;
var wlId = shared.wlId;
var numberOfSeats = 1;

shared.fanClient().then(client => {
    
    return shared.playbooks.joinWl(client, fgId, wlId, numberOfSeats)
    // prerequisite checks - fan has been assigned seats
    .then((wl) => {
        var position = wl.position;
        if(!position) {
            throw new Error('Fan is not in WL');
        } else if (position.status !== 'HAS_SEAT') {
            throw new Error('Fan seats are not assigned');
        } else if (!position.expirationDate) {
            throw new Error('Fan already has accepted');
        }
    })
    .then(() => {

        //TODO - accept seats

    });
    

})
.then(shared.exitOK, shared.exitFailMsg('Failed numberOfSeats'));