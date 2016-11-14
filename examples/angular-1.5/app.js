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
        Seaters.sessionService.doEmailPasswordLogin(email, password)
        .then(function(res) {
            console.log('logged in', res);
            $scope.error = undefined;
            $scope.result = res;
        }, function(err) {
            $scope.result = undefined;
            if(err instanceof Error) {
                $scope.error = err.stack;
            } else {
                $scope.error = err;
            }
        });
    };

});