angular.module('app',['ngMessages'])
.run(function($rootScope, $window) {
    $rootScope.SeatersSDK = $window.SeatersSDK;
})
.service('Seaters', function($window) {
    var sdk = $window.SeatersSDK;
    return new sdk.SeatersClient();
})
.controller('SignupController', function($scope, Seaters) {

    $scope.email = '';
    $scope.password = '';
    $scope.firstname = '';
    $scope.lastname = '';

    $scope.doSignup = function(form,email,password,firstname,lastname) {
        //Test if form is considered valid
        if (!form.$valid)
          return;

        //Start signup processing
        $scope.signupProcessing = true;
        Seaters.sessionService.doEmailPasswordSignUp(email,password,firstname,lastname)
        .then(
          function(res) {
            $scope.signupProcessing = false;
            $scope.error = undefined;
            $scope.result = res;

            $scope.$apply(); //need to apply here, otherwise doesn't seem to work

            alert("You have been signed up");
          },
          function(err) {
            $scope.signupProcessing = false;
            $scope.result = undefined;
            if(err instanceof Error) {
                $scope.error = err.stack;
            }
            else {
                $scope.error = err;
            }
            $scope.$apply(); //need to apply here, otherwise doesn't seem to work
          })
    };

});
