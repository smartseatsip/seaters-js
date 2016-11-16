
describe('when index is loaded', function() {
  it('should show the version specified in package.json', function() {
    browser.url('/');
    var indexVersion = browser.getText('#version');
    var packageVersion = require('../../package.json').version;
    expect(indexVersion).toEqual(packageVersion);
  });
});
