angular.module('app')
.config(function($stateProvider) {
    $stateProvider.state('app.public-fg', {
        url: '/public-fg',
        templateUrl: 'public-fg/public-fg.html',
        controller: 'PublicFgController',
        controllerAs: 'publicFg'
    });
})
.controller('PublicFgController', function(SeatersClient) {

    this.fgId = 'fc25df56-85b2-492f-8f12-c6b197491adb';

    this.load = function(fgId) {
        console.log('loading fg %s', fgId);
        SeatersClient.algoliaForSeatersService.getFangroupById(fgId).then(function(res) {
            console.log(res);
        }, function(err) {
            console.error('ERROR on find fg by id', err);
        });
    };

});