define([
    'angular',
    'services/ajax',
    'services/api',
    'services/auth',
    'services/oauth/fbLogin',
    'services/oauth/googleLogin'
], function(angular, ajax, api, auth, fbLogin, googleLogin) {
    angular
        .module('reciperejoice.services', [])
        .factory('ajax', ajax)
        .factory('api', api)
        .factory('auth', auth)
        .factory('fbLogin', fbLogin)
        .factory('googleLogin', googleLogin)
})
