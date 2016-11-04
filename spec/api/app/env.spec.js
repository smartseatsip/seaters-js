require('../../helpers');

describe('App Api', function() {

    var envP = client.api.app.env();

    it('should fetch env', function(done) {
        envP.then(null, apiFail('GET /api/app/env'))
            .then(done, shouldNotCatch(done));
    });

    it('should define a valid facebookAppId', done => {
        thenExpectMatch(envP, 'facebookAppId', /^[0-9]+$/, done);
    });

    it('should define a valid googleProjectNumber', done => {
        thenExpectMatch(envP, 'googleProjectNumber', /^[0-9]+$/, done);
    });

    it('should define a valid googleMapsApiKey', done => {
        thenExpectMatch(envP, 'googleMapsApiKey', /^[a-zA-Z0-9-_]+$/, done);
    });

    it('should define a valid deployTarget', done => {
        thenExpectMatch(envP, 'deployTarget', /^[a-zA-Z]+$/, done);
    });

    it('should define a valid timezonedbApiKey', done => {
        thenExpectMatch(envP, 'timezonedbApiKey', /^[A-Z0-9-]+$/, done);
    });

    it('should define a valid buildinfo object', done => {
        envP.then(env => {
            expect(env.buildInfo.version).toMatch(/^[0-9]+\.[0-9]+\.[0-9]+(-.*)?$/);
            expect(env.buildInfo.commitId).toMatch(/^[a-z0-9]+$/);
        }).then(done, shouldNotCatch(done));
    });


});
