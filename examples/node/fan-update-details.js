/**
 * Update details of a fan
 *
 *
 * minimum SDK version: 1.4.8
 */

var shared = require('../shared');

var sdk = shared.sdk;
var fgId = shared.fgId;
var wlId = shared.wlId;

shared.fanClient().then(client => {

    //Get the current logged in user
    var currentFan = client.sessionService.whoami();

    //Update personal info for a fan
    var newPersonalInfo = {
      address: {
        line1: 'Seaters Street 007',
        line2: 'optional',
        line3: 'optional',
        countryCode: 'BE',
        zipCode: '0007',
        city: 'London',
        state: null
      }
    };
    currentFan.personalInfo = newPersonalInfo;

    return client.fanService.updateFan(currentFan)
    . then(
      fan => {
        console.log('Fan details after update', fan);
      }
      ,error => {
          console.log("Returned error:", error);
      });
})
.then(shared.exitOK, shared.exitFail);
