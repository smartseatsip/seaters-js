angular.module('app',[])
.run(function($rootScope, $window) {
    var sdk = $rootScope.SeatersSDK = $window.SeatersSDK;
    var chance = $window.chance;
    
    var wlId = '671af8d2-07d8-46c9-857e-77494903933e';
    $rootScope.events = ['dark','teal','white','navy'].map((theme) => {
        return {
            wlId: wlId,
            name: chance.sentence(),
            location: chance.word() + ', New York',
            img: 'http://lorempixel.com/150/75/',
            theme: theme,
            date: chance.date({string:true})
        };
    });

});