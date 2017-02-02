angular.module('app', ['ngSanitize'])

.controller('AppController', function($http) {

  var vm = this;
  
  var demoBlock = $('#app-demo');
  
  vm.demos = [
      {
          file: 'node/fan-fail-to-unlock-fg.js',
          name: 'Fail To Unlock a FanGroup'
      },
      {
          file: 'node/fan-unlock-join-fg.js',
          name: 'Unlock a FanGroup'
      },
      {
          file: 'node/fan-join-leave-fg-wl.js',
          name: 'Join a FanGroup, Join a WaitingList, Leave both'
      },
      {
          file: 'node/public-fg-by-id.js',
          name: 'Fetch public FanGroup by ID'
      },
      {
          file: 'node/public-wl-by-fg-id.js',
          name: 'Fetch public WaitingLists by FanGroup ID'
      },
      {
          file: 'node/public-wl-by-id.js',
          name: 'Fetch public WaitingList by ID'
      },
      {
          file: 'node/public-wl-get-price.js',
          name: 'Fetch the price of a public WaitingList'
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
