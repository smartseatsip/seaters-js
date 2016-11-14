require('../../helpers');

describe('PUT /api/v2/authentication/token', function() {

    // logRequest('v2/authentication/token');

    function buildPasswordLoginData(email, password) {
        return {
            emailPasswordCredentials: {
                password: testConfig.users.fan1.password,
                email: testConfig.users.fan1.email
            },
            clientInfo: {
                type: 'seaters-test seaters-js',
                version: SeatersSDK.version
            }
        };
    }

    it('should return 200-OK on valid login', function(done) {
        client.api.authentication
            .token(buildPasswordLoginData('test@test.com', 'test'))
            .then(null, apiFail())
            .then(done, shouldNotCatch(done));
    });

});
