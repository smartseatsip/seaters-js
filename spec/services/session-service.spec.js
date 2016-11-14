require('../helpers');

describe('SessionService', function() {

    var fan1 = testConfig.fan1;

    it('should allow login-password', (done) => {
        client.sessionService.doEmailPasswordLogin(fan1.email, fan1.password)
            .then((userData) => {
                console.log('userdata: ' + JSON.stringify(userData));
            })
            .then(done, shouldNotCatch(done));
    });

});
