describe('Seaters library', function () {

  it('should expose the same version as package.json', function () {

    var SeatersSDK = require('../dist/seaters.module.js');
    var packageVersion = require('../package.json').version;
    expect(SeatersSDK.version).toBe(packageVersion);

  });

});
