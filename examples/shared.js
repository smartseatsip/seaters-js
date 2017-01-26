var SeatersSDK = require('../dist/seaters.module.js');

var config = require('./config.json');

var clients = false;

function buildClient() {
    if(!clients) {
        console.log('SeatersSDK v%s\n----------------\n', SeatersSDK.version);
        clients = [];
    }
    var client = new SeatersSDK.SeatersClient({ requestDriver: 'NODE' });
    clients.push(client);
    return client;
}

function buildLoggedInClient(user) {
    var client = buildClient();
    return client.sessionService.doEmailPasswordLogin(user.email, user.password)
    .then(
        () => {
            console.log('---client for %s', user.email);
            return client
        },
        (err) => {
            console.error('FAIL: buildClient - failed to log in');
            process.exit(1);
        }
    );
}

exports.config = config;
exports.fgId = config.fanGroup.fanGroupId;
exports.wlId = config.fanGroup.waitingListId;
exports.client = buildClient;
exports.adminClient = function() { return buildLoggedInClient(config.admin); };
exports.fanClient = function() { return buildLoggedInClient(config.fan); };
exports.fgoClient = function() { return buildLoggedInClient(config.fanGroup.fanGroupOwner); };
exports.exitOK = () => process.exit(0);
exports.exitFail = () => process.exit(1);
exports.exitFailMsg = (msg) => (err) => {
    if(err.error) {
        console.error('%s: %s => %s', msg, err.error, err.errorMsg);
    } else {
        console.error('%s', msg, err);
    }
    exports.exitFail();
}