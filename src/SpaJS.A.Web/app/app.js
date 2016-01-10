var app;
(function (app) {
    'use strict';
    var Config = (function () {
        function Config($routeProvider, $modalProvider, $httpProvider) {
            $routeProvider
                .when("/", {
                templateUrl: "/app/templates/customers/customersView.html",
                controller: "customersCtrl as vm"
            })
                .when("/about", {
                templateUrl: "/app/templates/about.html"
            })
                .otherwise({ redirectTo: '/' });
        }
        return Config;
    })();
    app.Config = Config;
    var mainApp = angular.module('sampleAngularApp', [
        'ngAnimate', 'ngCookies', 'ngRoute', 'ui.bootstrap', 'ui.bootstrap.tpls'
    ]);
    mainApp.config(Config);
    Config.$inject = ['$routeProvider', '$httpProvider'];
})(app || (app = {}));
