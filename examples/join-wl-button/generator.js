angular.module('app',[])
.controller('GeneratorController', function($scope, $timeout) {
    this.buttons = ['dark', 'teal', 'white'].map(name => {
        return {
            name: name,
            cssClass: 'strs-btn-'+name 
        };
    });
    
    this.wlUrl = 'https://www.seaters.com/bco/waitinglist/671af8d2-07d8-46c9-857e-77494903933e';
    
    this.renderCode = () => {
        var uuidMatches = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.exec(this.wlUrl);
        var wlId = (uuidMatches.length > 0 && uuidMatches[0]) || '????';
        var headPart = '<script src="https://sdk.dev-seaters.com/seaters.bundle.js" type="text/javascript"></script>\n' +
            '<link rel="stylesheet" href="https://sdk.dev-seaters.com/assets/join-wl/css/seaters-join-wl.css">\n';
        var bodyPart = '<button class="strs-joinwl-btn strs-joinwl-btn-'+this.selectedButton.name+'" onclick="SeatersSDK.joinwl(\''+wlId+'\')"></button>';
        this.code = headPart + bodyPart;
        
        var sandboxSrc = '<html><head>'+headPart+'</head><body>'+bodyPart+'</body></html>';
        document.getElementById('sandbox').src =  'data:text/html;charset=utf-8,' + escape(sandboxSrc);
    };
    
});