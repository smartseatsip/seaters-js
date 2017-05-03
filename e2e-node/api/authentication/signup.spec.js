require('../../helpers');

describe('PUT /api/auth/signup', function () {

  //logRequest('auth/signup');
  it('should return 200-OK found on signup of new user', function (done) {
    var newUser = randomUser();
    client.api.authentication
      .signup(newUser)
      .then((userData) => {
        expect(userData['firstName']).toMatch(newUser.firstName);
        expect(userData['lastName']).toMatch(newUser.lastName);
        expect(userData['email']).toMatch(newUser.email);
      }, apiFail())
      .then(done, shouldNotCatch(done));
  });

  /**
   * Cannot run this test normally, as the validation code needs to come from email
   * Uncomment and adapt this test to manually perform the test
   *
   it('should return 200-OK found on validation of new user', function(done) {
    client.api.authentication
      .validate({ code:'1234', email:'test@test.com' })
      .then(null, apiFail() )
      .then(done, shouldNotCatch(done));
  });
   */

});
