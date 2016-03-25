(function () {
    'use strict';

    var app = angular.module('mainApp', [
        // Angular modules 

        // Custom modules 
        'dataMockApp',//mock module. Remove to run webapi backend
        'dataApp',

        // 3rd Party Modules
        'ui.router',
        'ui.bootstrap',
        'ngTable'
    ]);

    function config($stateProvider, $urlRouterProvider, $locationProvider) {

        //$locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "app/main/views/home-view.tpl.html",
                controller: "homeCtrl",
                controllerAs: "vm",
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('about', {
                url: "/about",
                templateUrl: "app/main/views/about-view.tpl.html",
                controller: "aboutCtrl",
                controllerAs: "vm",
                ncyBreadcrumb: {
                    label: 'About'
                }
            });
    }

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    app.config(config);
})();