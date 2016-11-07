angular.module('app',[])
.run(function($rootScope, $window) {
    $rootScope.SeatersSDK = $window.SeatersSDK;
})
.service('Seaters', function($window) {
    var sdk = $window.SeatersSDK;
    return new sdk.SeatersClient();
})
.controller('AppController', function($scope, Seaters) {

    $scope.email = 'test@test.com';
    $scope.password = 'test';
    
    $scope.doLogin = function(email, password) {
        Seaters.api.authentication.token({
            emailPasswordCredentials: {
                password: password,
                email: email
            }
        }).then(function(res) {
            $scope.error = undefined;
            $scope.result = res;
        }, function(err) {
            $scope.result = undefined;
            $scope.error = err;
        });
    };

});