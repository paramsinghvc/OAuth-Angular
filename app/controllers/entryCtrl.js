define([], function() {
    return ['$scope', 'auth',
        function($scope, auth) {
            $scope.logout = function() {
                auth.logout();
            }
            $scope.getAccount = function() {
                return auth.account().then(function(res) {
                	$scope.account = res;	
                },
                 function(err) {})                
            }

            $scope.getAccount();
        }
    ]
})
