angular.module('app',[])
.run(function($rootScope, $window) {
    var sdk = $rootScope.SeatersSDK = $window.SeatersSDK;
    $rootScope.SeatersClient = new sdk.SeatersClient();
});