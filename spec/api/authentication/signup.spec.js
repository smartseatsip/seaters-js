require('../../helpers');

describe('PUT /api/auth/signup', function() {

    //logRequest('auth/signup');
    it('should return 200-OK found on signup of new user', function(done) {
        var newUser = randomUser();
        client.api.authentication
            .signup(newUser)
            .then((userData) => {
              expect(userData['firstName']).toMatch(newUser.firstName);
              expect(userData['lastName']).toMatch(newUser.lastName);
              expect(userData['email']).toMatch(newUser.email)
            }, apiFail() )
            .then(done, shouldNotCatch(done));
    });

});
