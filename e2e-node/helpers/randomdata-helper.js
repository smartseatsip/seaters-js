var Chance = require('chance');
var chance = new Chance();

function randomUser() {
  return {
    email: chance.email({domain: 'seaters-lib-tests.com'}),
    lastName: chance.last(),
    firstName: chance.first(),
    password: chance.string(),
    language: 'en'
  };
}

module.exports = {
    randomUser: randomUser
}
