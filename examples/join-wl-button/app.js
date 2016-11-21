angular.module('app',[])
.run(function($rootScope, $window) {
    var sdk = $rootScope.SeatersSDK = $window.SeatersSDK;
    var client = $rootScope.SeatersClient = new sdk.SeatersClient();
    $rootScope.joinWl = (wlId) => sdk.joinWl(wlId);
});