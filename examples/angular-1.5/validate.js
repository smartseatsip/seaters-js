angular.module('app', ['ngMessages'])
  .run(function ($rootScope, $window) {
    $rootScope.SeatersSDK = $window.SeatersSDK;
  })
  .service('Seaters', function ($window) {
    var sdk = $window.SeatersSDK;
    return new sdk.SeatersClient();
  })
  .controller('ValidateController', function ($scope, Seaters) {

    $scope.confirmationCode = '';
    $scope.userData = {
      email: 'test@test.com',
      firstName: 'Tester'
    };

    $scope.doValidate = function (form, code) {
      //Test if form is considered valid
      if (!form.$valid) {
        return;
      }

      //Start signup processing
      $scope.formProcessing = true;
      Seaters.sessionService.doValidation($scope.userData.email, code)
        .then(
          function (res) {
            $scope.formProcessing = false;
            $scope.error = undefined;
            $scope.result = res;
            $scope.$apply(); //need to apply here, otherwise doesn't seem to work

            alert('you have been confirmed');
          },
          function (err) {
            $scope.formProcessing = false;
            $scope.result = undefined;
            if (err instanceof Error) {
              $scope.error = err.stack;
            }
            else {
              //TODO: fix server side validaion msg, which is currently not json
              $scope.error = err;
            }
            $scope.$apply(); //need to apply here, otherwise doesn't seem to work
          });
    };

  });
