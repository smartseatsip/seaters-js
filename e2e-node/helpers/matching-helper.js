function apiFail(msg) {
  return function (err) {
    var actual = err.errorMsg || JSON.stringify(err);
    fail(msg || 'error' + ' => ' + actual);
  };
}

function shouldNotCatch(done) {
  return (err) => {
    console.error(err);
    fail('Potential Bad Test : should not catch');
    done();
  };
}

function thenExpectMatch(p, field, matcher, done) {
  p.then(r => {
    expect(r[field]).toMatch(matcher);
  }).then(done, shouldNotCatch(done));
}

module.exports = {
  apiFail: apiFail,
  shouldNotCatch: shouldNotCatch,
  thenExpectMatch: thenExpectMatch
};
