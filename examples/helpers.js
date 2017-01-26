var SeatersSDK = require('../dist/seaters.module.js');

var nodeClient = false;
function getNodeClient() {
    if(!nodeClient) {
        console.log('SeatersSDK v%s\n----------------\n', SeatersSDK.version);
        nodeClient = new SeatersSDK.SeatersClient({ requestDriver: 'NODE' });
    }
    return nodeClient;
}

exports.getNodeClient = getNodeClient;