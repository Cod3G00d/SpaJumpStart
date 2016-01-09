///<reference path="../Scripts/typings/jquery/jquery.d.ts"/>
///<reference path="../Scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../Scripts/typings/angularjs/angular.d.ts"/>
///<reference path="../Scripts/typings/angularjs/angular-route.d.ts" />
/*
Typescript module to define the main app module
*/
var app;
(function (app) {
    'use strict';
    /*
    Typescript class to define the routing module, encaspulating angular routing
    
    To accomplish routing we inject the $routingProvider of type definiton file: ng.route.IRouteProvider
    in the class constructor

    */
    var Config = (function () {
        function Config($routeProvider, $modalProvider, 
            //$http: ng.IHttpService,
            $httpProvider) {
            $routeProvider
                .when("/", {
                templateUrl: "/app/templates/customers/customersView.html",
                controller: "customersCtrl as vm"
            })
                .when("/about", {
                templateUrl: "/app/templates/about.html"
            })
                .otherwise({ redirectTo: '/' });
            //$httpProvider.interceptors.push('xmlHttpInteceptor');
            ////if (!$httpProvider.defaults.headers.get) {
            ////    $httpProvider.defaults.headers.get = {};
            ////};
            //$http.defaults.headers.get['Cache-Control'] = 'no-cache';
            //$http.defaults.headers.get['Pragma'] = 'no-cache'
            //$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            //$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        }
        return Config;
    })();
    app.Config = Config;
    var mainApp = 
    //angular.module('sampleAngularApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.bootstrap.tpls', 'ngCookies', 'ngSanitize', 'ngTouch'])
    angular.module('sampleAngularApp', [
        'ngAnimate', 'ngCookies', 'ngRoute', 'ui.bootstrap', 'ui.bootstrap.tpls'
    ]);
    //'ngRoute', 'ngAnimate', 'ui.bootstrap', , 'ngCookies']);
    //.service('constantsService', app.common.services.ConstantsService)
    //.controller('AuthService', app.common.services.UserAccountService);
    mainApp.config(Config);
    Config.$inject = ['$routeProvider', '$httpProvider'];
})(app || (app = {}));
