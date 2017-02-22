angular.module('app', ['ngSanitize', 'ui.router'])
.config(function($urlRouterProvider, $stateProvider) {
    
    $stateProvider
    .state('app', {
        url: '/',
        templateUrl: 'app.html',
        controller: 'AppController',
        controllerAs: 'app',
        resolve: {
            _init_: (DemoService) => DemoService.initialize()
        }
    })
    .state('app.demo', {
        url: 'demo/:slug',
        templateUrl: 'demo.html',
        controller: 'DemoController',
        controllerAs: 'demo',
        resolve: {
            demo: ($stateParams, DemoService) => DemoService.loadDemo($stateParams.slug)
        }
    })
    .state('app.diagram', {
        url: 'diagram/:slug',
        templateUrl: 'diagram.html',
        controller: 'DiagramController',
        controllerAs: 'diagram',
        resolve: {
            diagram: ($stateParams, DemoService) => DemoService.loadDiagram($stateParams.slug)
        }
    });

    $urlRouterProvider.when('', '/');

})
.run(function($rootScope) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        console.log('stateChangeError: %s(%s) => %s(%s)', fromState||'<root>', JSON.stringify(fromParams||{}), toState||'<??>', JSON.stringify(toParams||{}));
        console.log(error);
    });
})
.service('DemoService', function($http, $q) {

    var vm = {};

    function slugify(name) {
        return name
            .toLowerCase()
            .replace(/\s/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '');
    }

    function mkdemo(category, name, file) {
        if(categories.indexOf(category) < 0) { throw new Error('Category for demo not defined'); }
        var slug = slugify(category) + '_' + slugify(name);
        return {
            category: category,
            name: name,
            file: file,
            slug: slug
        };
    };

    var categories = [];

    var demos = [];

    var diagrams = vm.diagrams = [];
    
    var initializeP = false;
    vm.initialize = () => {
        if(!initializeP) { initializeP = initialize(); }
        return initializeP;
    };

    function initialize () {
        return $q.all([
            initializeDemos(),
            initializeDiagrams()
        ]);
    }
    
    function initializeDemos() {
        return $http.get('demos.json')
        .then(res => {
            res.data.forEach(demoSet => {
                if(categories.indexOf(demoSet.category) < 0) {
                    categories.push(demoSet.category);
                }
                demoSet.demos.forEach(demo => demos.push(mkdemo(demoSet.category, demo.name, demo.file)))
            });
        });
    }

    function initializeDiagrams() {
        return $http.get('diagrams.json')
        .then(res => {
            res.data.forEach(diagram => {
                diagrams.push(angular.extend({
                    slug: slugify(diagram.file)
                }, diagram));
            });
        });
    }

    vm.loadDemo = (slug) => {
        return vm.initialize().then(() => {
            var demo = demos.find(demo => demo.slug === slug);
            if(!demo) { throw new Error('Demo not found:' + slug); }
            return $http.get(demo.file).then((res) => {
                demo.code = res.data;
                demo.codeblock = '<pre><code class="javascript">' + demo.code + '</code></pre>';
                return demo;
            });
        });
    };

    vm.loadDiagram = (slug) => {
        return vm.initialize().then(() => {
            var diagram = diagrams.find(diagram => diagram.slug === slug);
            if(!diagram) { throw new Error('Diagram not found: ' + slug); }
            return $q.resolve(diagram);
        });
    };

    vm.getDemosGroupedByCategory = () => categories.map(cat => { return { name: cat, demos: demos.filter(demo => demo.category === cat) }; });

    return vm;

})
.controller('AppController', function($http,DemoService,$state) {

  var vm = this;

  vm.categories = DemoService.getDemosGroupedByCategory();
  vm.diagrams = DemoService.diagrams;

})
.controller('DemoController', function(DemoService, demo) {
    
    var vm = this;
    angular.extend(vm, demo);

    $('#app-demo')
        .html(demo.codeblock)
        .each((i, block) => hljs.highlightBlock(block));
    

})
.controller('DiagramController', function(DemoService, diagram) {
    var vm = this;
    angular.extend(vm, diagram);
})
