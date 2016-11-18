angular.module('app',[])
.run(function($rootScope, $window) {
    var sdk = $rootScope.SeatersSDK = $window.SeatersSDK;
    var client = $rootScope.SeatersClient = new sdk.SeatersClient();
    $rootScope.joinWL = (id) => client.joinWlService2.joinWl(id);
});