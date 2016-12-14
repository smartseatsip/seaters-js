angular.module('app',[])
.run(function($rootScope, $window) {
    var sdk = $rootScope.SeatersSDK = $window.SeatersSDK;
    var chance = $window.chance;

    $rootScope.wlId = '40591787-936f-4c8a-b6e6-0a97f7583f69';
    $rootScope.events = ['dark','teal','white','navy'].map((theme) => {
        return {
            name: chance.sentence(),
            location: chance.word() + ', New York',
            img: 'http://lorempixel.com/150/75/',
            theme: theme,
            date: chance.date({string:true})
        };
    });

});
