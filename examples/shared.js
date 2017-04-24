var SeatersSDK = require('../dist/seaters.module.js');

var config = require('./config.json');

var clients = false;

function buildClient(endpoint) {
  if (!clients) {
    console.log('SeatersSDK v%s\n----------------\n', SeatersSDK.version);
    clients = [];
  }
  var client = new SeatersSDK.SeatersClient({
    apiPrefix: endpoint || 'https://api.dev-seaters.com/api',
    requestDriver: 'NODE'
  });
  clients.push(client);
  return client;
}

function buildLoggedInClient(user) {
  var client = buildClient();
  return client.sessionService.doEmailPasswordLogin(user.email, user.password)
    .then(
      () => {
        console.log('---client for %s', user.email);
        return client;
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

exports.sdk = SeatersSDK;

exports.client = buildClient;
exports.adminClient = function () {
  return buildLoggedInClient(config.admin);
};
exports.fanClient = function () {
  return buildLoggedInClient(config.fan);
};
exports.fgoClient = function () {
  return buildLoggedInClient(config.fanGroup.fanGroupOwner);
};

exports.clients = function () {
  return Promise.all([
    exports.adminClient(),
    exports.fanClient(),
    exports.fgoClient()
  ]).then((clients) => {
    return {
      admin: clients[0],
      fan: clients[1],
      fgo: clients[2]
    };
  });
};

exports.exitOK = () => process.exit(0);
exports.exitFail = (err) => {
  console.error('FAIL', err);
  process.exit(1);
};
exports.exitFailMsg = (msg) => (err) => {
  if (err.error) {
    console.error('%s: %s => %s', msg, err.error, err.errorMsg);
  } else {
    console.error('%s', msg, err);
  }
  exports.exitFail();
};

exports.playbooks = {

  /**
   * For a fan client, join a fg if needed and then join a wl in this fg
   */
  joinWl: function (client, fgId, wlId, numberOfSeats) {
    return client.fanGroupService.getFanGroup(fgId)
      .then(fg => {
        if (fg.membership.member) {
          return fg;
        } else {
          return client.fanGroupService.joinFanGroup(fgId);
        }
      })
      .then(() => client.waitingListService.getWaitingList(wlId))
      .then(wl => {
        if (wl.position) {
          return wl.position;
        } else {
          return client.waitingListService.joinWaitingList(wlId, numberOfSeats);
        }
      });
  }

};

exports.defaultPaging = { itemOffset: 0, maxPageSize: 10 };
