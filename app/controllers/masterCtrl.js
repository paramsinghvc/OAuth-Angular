define(['config'], function(config) {
    return ['$scope', '$rootScope', 'api', '$location',
    function($scope, $rootScope, api, $location) {
    	$scope.appTitle = config.appName;
    	$scope.$on('logged-out', function(){
    		$location.path('/');
    	})
    }]
})
