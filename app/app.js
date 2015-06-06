define([
    'angular',
    'jquery',
    'controllers',
    'directives',
    'filters',
    'services',
    'bootstrap',
    'ngRoute',
    'uiBootstrap',
    'config',

], function(
    angular,
    $,
    controllers,
    directives,
    filters,
    services,
    bootstrap,
    ngRoute,
    config

) {

    angular.module('reciperejoice', [
        'reciperejoice.controllers',
        'reciperejoice.services',
        'reciperejoice.directives',
        'reciperejoice.filters',
        'ui.bootstrap',
        'ngRoute'
    ]).config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }).run(function() {
        window.fbAsyncInit = function() {
            FB.init({
                appId: '895432370516061',
                xfbml: true,
                version: 'v2.3'
            });
        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    })
});
