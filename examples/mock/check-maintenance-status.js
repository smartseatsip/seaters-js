var shared = require('./_shared');

function logServiceStatus(isInMaintenance) {
  if (isInMaintenance) {
    console.log('Seaters platform is in maintenance');
  } else {
    console.log('Seaters platform is up');
  }
}

Promise.resolve(true)
// happy flow - appService is not in maintance
  .then(() => shared.client.appService.isInMaintenance())
  .then(logServiceStatus)

  // simulate a downage
  .then(() => shared.scenarios.health.toggleNodeDown())
  .then(() => shared.client.appService.isInMaintenance())
  .then(logServiceStatus)

  .then(shared.exitOK, shared.exitFail);
