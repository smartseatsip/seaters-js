angular.module('app',[])
.run(function($rootScope, $window) {

    $rootScope.buttons = [
        // 'Button - Dark@2x.png',                                                                                                                                                    
        'Button - Dark.png',                                                                                                                                                    
        // 'Button - Dark - roll-over@2x.png',
        // 'Button - Dark - roll-over.png',
        // 'Button - Dark.svg',
        
        // 'Button - Teal@2x.png',
        'Button - Teal.png',
        // 'Button - Teal - roll-over@2x.png',
        // 'Button - Teal - roll-over.png',
        // 'Button - Teal.svg',
        
        // 'Button - White@2x.png',
        'Button - White.png',
        // 'Button - White - roll-over@2x.png',
        // 'Button - White - roll-over.png'
    ].map(fileName => {
        return {
            fileName: fileName,
            localUrl: '/assets/join-wl/images/'+encodeURIComponent(fileName)
        };
    });
});