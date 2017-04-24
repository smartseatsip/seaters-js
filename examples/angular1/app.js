app
  .service('SeatersSDK', function ($window) {
    return $window.SeatersSDK;
  })
  .service('SeatersClient', function (SeatersSDK) {
    return new SeatersSDK.SeatersClient();
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
      url: '/app',
      templateUrl: 'app.html',
      controller: 'AppController',
      controllerAs: 'app'
    });
    $urlRouterProvider.otherwise('/app');
  })
  .controller('AppController', function (SeatersSDK) {

    this.sdkVersion = SeatersSDK.version;

  });
