define([
        'angular',
        'controllers/masterCtrl',
        'controllers/homeCtrl',
        'controllers/entryCtrl'
    ],
    function(
        angular,
        masterCtrl,
        homeCtrl,
        entryCtrl
    ) {
        angular
            .module('reciperejoice.controllers', [])
            .controller('masterCtrl', masterCtrl)
            .controller('homeCtrl', homeCtrl)
            .controller('entryCtrl', entryCtrl)
    })
