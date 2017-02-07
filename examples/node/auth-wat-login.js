/**
 * Perform a oAuth login with a specific provider.
 * In this example, the WAT oAuth provider is used and a dummy token (code)
 *
 *
 * minimum SDK version: 1.4.7
 */

var shared = require('../shared');
var oauthProvider = 'wat';

shared.fanClient().then(client => {
    console.log("Perform Seaters login with WAT oAuth provider and token...");
    return client.sessionService.doOAuthCodeLogin(oauthProvider,'myWatToken')
    .then(
      fan => {
        console.log('Logged in with user', fan); },
      error => {
        console.log("Returned error:", error); }
    );
})
.then(shared.exitOK, shared.exitFail);
