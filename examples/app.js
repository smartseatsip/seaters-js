angular.module('app', ['ngSanitize'])

.controller('AppController', function($http) {

  var vm = this;

  var demoBlock = $('#app-demo');

  function mkdemo(name, file) {
      return {
          name: name,
          file: file
      };
  }

  vm.categories = [
      {
          name: 'Session',
          demos: [
            mkdemo('Login with WAT oAuth', 'node/auth-wat-login.js'),
          ]
      },
      {
          name: 'Fan operations',
          demos: [
              mkdemo('Fail To Unlock a FanGroup', 'node/fan-fail-to-unlock-fg.js'),
              mkdemo('Unlock a FanGroup', 'node/fan-unlock-join-fg.js'),
              mkdemo('Join a FanGroup, Join a WaitingList, Leave both', 'node/fan-join-leave-fg-wl.js'),
              mkdemo('Fetch single WaitingList by WaitingList ID', 'node/fan-wl-by-id.js'),
              mkdemo('Fetch list of WaitingLists by FanGroup ID', 'node/fan-wl-in-fg.js'),
              mkdemo('Accept a seat for a WaitingList', 'node/fan-accept-seat.js'),
              mkdemo('Export a seat for a WaitingList (generate PDF)', 'node/fan-export-seat.js'),
              mkdemo('Update details of a Fan', 'node/fan-update-details.js'),
          ]
      },
      {
          name: 'Public data',
          demos: [
              mkdemo('Fetch public FanGroup by ID', 'node/public-fg-by-id.js'),
              mkdemo('Fetch public WaitingLists by FanGroup ID', 'node/public-wl-by-fg-id.js'),
              mkdemo('Fetch public WaitingList by ID', 'node/public-wl-by-id.js'),
              mkdemo('Fetch the price of a public WaitingList', 'node/public-wl-get-price.js'),
          ]
      }
  ];

  vm.showDemo = function(demo) {
      $http.get(demo.file).then(function(res) {
          demoBlock.html('<pre><code class="javascript">' + res.data + '</code></pre>');
          $(demoBlock).each(function(i, block) {
              hljs.highlightBlock(block);
          });
          vm.activeDemo = demo.name;
      });
  };

    vm.activeDemo = undefined;

    vm.diagrams = [
      {
          file: 'images/fg-statemachine.png',
          name: 'FanGroup actionStatus'
      },
      {
          file: 'images/wl-statemachine.png',
          name: 'WaitingList actionStatus'
      }
    ];

    vm.showDiagram = function(diagram) {
        demoBlock.html('<img src="' + diagram.file + '" />');
        vm.activeDemo = diagram.name;
    };

});

setTimeout(function() {
  angular.bootstrap(document.getElementById('body'), ['app']);
});
