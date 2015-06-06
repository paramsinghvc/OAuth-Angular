define([
        'angular',
        'app',
        'text!views/home.html',
        'text!views/nav.html',
        'text!views/entry.html'
    ],
    function(
        angular,
        app,
        homeHtml,
        navHtml,
        entryHtml
    ) {
        angular.module('reciperejoice').run(['$templateCache', function($t) {
            $t.put('home', homeHtml);
            $t.put('nav', navHtml);
            $t.put('entry', entryHtml);
        }])
    })
