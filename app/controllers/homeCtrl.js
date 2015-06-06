define([], function() {
    return ['$scope', 'fbLogin', 'googleLogin',
     function($scope, fbLogin, googleLogin) {
        $scope.msg = "Heyya";
        $scope.fbLogin = function(){
        	fbLogin.initLogin();
        }
        $scope.googleLogin = function(){
        	googleLogin.initLogin();
        }
    }]
})
