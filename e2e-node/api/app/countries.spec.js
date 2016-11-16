require('../../helpers');

describe('GET /api/app/countries', function() {

    var p = client.api.app.countries();

    it('should return 200-OK', function(done) {
        p.then(null, apiFail())
        .then(done, shouldNotCatch(done));
    });

    it('should define some countries', done => {
        p.then(countries => expect(countries.totalSize).not.toBe(0))
        .then(done, shouldNotCatch(done));
    });

    it('should define only valid countries', done => {
        p.then(res => client.api.app.countries({maxPageSize: res.totalSize}))
        .then(countries => {
            expect(countries.items.length).toBe(countries.totalSize);
            countries.items.forEach((country) => {
                expect(country.alpha2Code).toMatch(/^[A-Z]{2}$/);
                expect(country.name).toMatch(/^[A-Z\u00C0-\u017F][a-zA-Z\u00C0-\u017F- \(\)]+$/);
                expect(country.callingCodes.length).not.toBe(0);
            });
        })
        .then(done, shouldNotCatch(done));
    });

});
