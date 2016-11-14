require('../../helpers');

describe('PUT /api/auth/signup', function() {

    logRequest('auth/signup');

    it('should return 200-OK found on signup of new user', function(done) {
        client.api.authentication
            .signup(randomUser())
            .then(done, apiFail() )
            .then(done, shouldNotCatch(done));
    });

});
