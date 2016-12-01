angular.module('app',[])
.controller('GeneratorController', function($scope, $timeout) {
    this.buttons = [['dark', 'teal'], ['white', 'navy']].map(row => {
        return row.map(name => {
            return {
                name: name,
                cssClass: 'strs-btn-'+name 
            };
        })
    });
    
    this.selectedButton = this.buttons[0][0];
    
    this.wlUrl = 'https://www.seaters.com/adele/waitinglist/671af8d2-07d8-46c9-857e-77494903933e';

    $scope.$watch(() => this.selectedButton, () => this.renderCode());
    $scope.$watch(() => this.wlUrl, () => this.renderCode());

    this.renderCode = () => {
        var uuidMatches = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.exec(this.wlUrl);
        var wlId = (uuidMatches.length > 0 && uuidMatches[0]) || '????';
        this.code = '' +
            '<script src="https://sdk.dev-seaters.com/seaters.bundle.js" type="text/javascript"></script>\n' +
            '<link rel="stylesheet" href="https://sdk.dev-seaters.com/assets/join-wl/css/seaters-join-wl.css">\n' +
            '<button class="strs-joinwl-btn strs-joinwl-btn-'+this.selectedButton.name+'" onclick="SeatersSDK.joinWl(\''+wlId+'\')"></button>';
        
        var sandboxSrc = '<html><head></head><body>'+this.code+'</body></html>';
        document.getElementById('sandbox').src =  'data:text/html;charset=utf-8,' + escape(sandboxSrc);
    };

    this.copyCode = () => {
        angular.element('#code')[0].select();
        try {
            var successful = document.execCommand('copy');
            if(!successful) { throw 'failed to copy'; }
        } catch (err) {
            Alert('Press enter then ctrl+c to copy');
        }
    };
    
});