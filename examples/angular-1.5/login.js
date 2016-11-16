angular.module('app',['ngMessages'])
.run(function($rootScope, $window) {
    $rootScope.SeatersSDK = $window.SeatersSDK;
})
.service('Seaters', function($window) {
    var sdk = $window.SeatersSDK;
    return new sdk.SeatersClient();
})
.controller('LoginController', function($scope, Seaters) {

    $scope.doLogin = function(form, email, password) {
        //Test if form is considered valid
        if (!form.$valid)
          return;

        //Start form processing
        $scope.formProcessing = true;
        Seaters.sessionService.doEmailPasswordLogin(email, password)
        .then(function(res) {
            $scope.formProcessing = false;
            $scope.error = undefined;
            $scope.result = res;

            $scope.$apply(); //need to apply here, otherwise doesn't seem to work

            alert("You have sucessfully logged in");
        }, function(err) {
            $scope.formProcessing = false;
            $scope.result = undefined;
            if(err instanceof Error) {
                $scope.error = err.stack;
            } else {
                $scope.error = err;
            }
            $scope.$apply(); //need to apply here, otherwise doesn't seem to work
        });
    };

});
