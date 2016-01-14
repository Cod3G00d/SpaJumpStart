///<reference path="../Scripts/typings/jquery/jquery.d.ts"/>
///<reference path="../Scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../Scripts/typings/angularjs/angular.d.ts"/>
///<reference path="../Scripts/typings/angularjs/angular-route.d.ts" />

/*
Typescript module to define the main app module
*/

module app {
    'use strict';
    /*
    Typescript class to define the routing module, encaspulating angular routing
    
    To accomplish routing we inject the $routingProvider of type definiton file: ng.route.IRouteProvider 
    in the class constructor

    */

    export class Config {

        //static $inject = ['$routeProvider', '', '$httpProvider'];

        constructor(
            $routeProvider: ng.route.IRouteProvider,
            //$modalProvider: ng.ui.bootstrap.IModalProvider,
            //$http: ng.IHttpService,
            $httpProvider: ng.IHttpProvider) {


            $routeProvider
                .when("/", {
                    templateUrl: "/app/views/customers/customersView.html",
                    //requiresLogin: true,
                    controller: "customersCtrl as vm"

                })
                .when('/Account/Login', {
                    templateUrl: '/app/views/accounts/login.html',
                    controller: 'loginCtrl as vm'
                })
                .when('/Account/Register', {
                    templateUrl: '/app/views/accounts/register.html',
                    controller: 'registerUserCtrl as vm'
                })
                .when("/About", {
                    templateUrl: "/app/views/about.html"
                })
                .otherwise({
                    templateUrl: '/app/views/shared/_404.html'
                });
        

            $httpProvider.interceptors.push('xmlHttpInterceptorService');
            //initialize get if not there
            if (!$httpProvider.defaults.headers.get) {
                //$httpProvider.defaults.headers.get = {};
            };


            $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'];

            //delete $httpProvider.defaults.headers.common['X-Requested-With'];


            //$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            //$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
            
            //$http.defaults.headers.get['Cache-Control'] = 'no-cache';
            //$http.defaults.headers.get['Pragma'] = 'no-cache'

        }

        //errorHandler(status: string, message: string): void {
        //    var scope = angular.element($('html')).scope();
        //    scope.errorHandler(status, message);

        //    scope.safeApply(function () {
        //        scope.errorHandler(status, message);
        //    })
        //};
    }

    var mainApp =
        //angular.module('sampleAngularApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.bootstrap.tpls', 'ngCookies', 'ngSanitize', 'ngTouch'])
        angular.module('sampleAngularApp', [
            'ngAnimate', 'ngCookies', 'ngRoute', 'ui.bootstrap', 'ui.bootstrap.tpls'
            //'controllers', 'services'
        ]);
            //'ngRoute', 'ngAnimate', 'ui.bootstrap', , 'ngCookies']);
   
    mainApp
        .config(Config)
        //.config(app.route.RouteConfig)
        //.service('constantsService', app.services.common.ConstantsService)
        //.service('constantsService', app.services.common.ConstantsService);
        //.service('dataService', app.services.common.DataService);
        //.service('userAccountService', app.services.accounts.UserAccountService);
        //.controller('registerUserCtrl', app.controllers.accounts.RegisterUserCtrl);
        //.controller('loginCtrl', app.controllers.accounts.LoginCtrl);
        //.controller("customerModalCtrl", app.controllers.customers.CustomerModalCtrl);
        //.controller("customersCtrl", app.controllers.customers.CustomersCtrl);
        .run(checkAuthentication);

    
    //checkAuthentication.$inject = ['$rootScope', '$location', 'tokenHandlerFactory'];
    //function checkAuthentication($rootScope, $location, tokenHandlerFactory) {

    checkAuthentication.$inject = ['$rootScope', '$location', 'tokenHandlerService'];
    function checkAuthentication($rootScope, $location, tokenHandlerService) {

        //var tokenHandlerService = tokenHandlerFactory.create();

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var requiresLogin = next.requiresLogin || false;
            if (requiresLogin) {

                var loggedIn = tokenHandlerService.hasLoginToken();

                if (!loggedIn) {
                    $location.path('/Account/Login');
                }
            }
        });
    }

    //app.route.RouteConfig.$inject = ['$routeProvider'];
    Config.$inject = ['$routeProvider', '$httpProvider'];
    
    //var modules = ['ngRoute', '$routeProvider', 'ngAnimate', 'ui.bootstrap'];
    //var mainApp = angular.module('sampleAngularApp', ['ngRoute']);

    //var services = angular.module('services', []);
    //var controllers = angular.module('controllers', []);
}