angular.module('joinWlButtonApp',[])
.run(function($rootScope, $window) {
    var sdk = $rootScope.SeatersSDK = $window.parent.SeatersSDK;
});