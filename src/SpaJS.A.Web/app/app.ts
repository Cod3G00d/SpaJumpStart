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
        constructor($routeProvider: ng.route.IRouteProvider,
            $modalProvider: ng.ui.bootstrap.IModalProvider,
            //$http: ng.IHttpService,
            $httpProvider: ng.IHttpProvider) {
        
            $routeProvider
                .when("/", {
                    templateUrl: "/app/templates/customers/customersView.html",
                    controller: "customersCtrl as vm"
                })
                .when("/about", {
                templateUrl: "/app/templates/about.html"
                    //controller: "customerAddCtrl as vm"
                })
                .otherwise({ redirectTo: '/' })
                ;

            //$httpProvider.interceptors.push('xmlHttpInteceptor');
            ////if (!$httpProvider.defaults.headers.get) {
            ////    $httpProvider.defaults.headers.get = {};
            ////};
            
            //$http.defaults.headers.get['Cache-Control'] = 'no-cache';
            //$http.defaults.headers.get['Pragma'] = 'no-cache'

            //$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            //$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        }

    }

    var mainApp =
        //angular.module('sampleAngularApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.bootstrap.tpls', 'ngCookies', 'ngSanitize', 'ngTouch'])
        angular.module('sampleAngularApp', [
            'ngAnimate', 'ngCookies', 'ngRoute', 'ui.bootstrap', 'ui.bootstrap.tpls'
        ]);
            //'ngRoute', 'ngAnimate', 'ui.bootstrap', , 'ngCookies']);
   
    
    
    //.service('constantsService', app.services.common.ConstantsService);
    //.service('dataService', app.services.common.DataService);
    //.service('userAccountService', app.services.accounts.UserAccountService);
    //.controller('registerUserCtrl', app.controllers.accounts.RegisterUserCtrl);
    //.controller('loginCtrl', app.controllers.accounts.LoginCtrl);
    //.controller("customerModalCtrl", app.controllers.customers.CustomerModalCtrl);
    //.controller("customersCtrl", app.controllers.customers.CustomersCtrl);

    mainApp.config(Config);

    Config.$inject = ['$routeProvider', '$httpProvider'];
    //var modules = ['ngRoute', '$routeProvider', 'ngAnimate', 'ui.bootstrap'];
    //var mainApp = angular.module('sampleAngularApp', ['ngRoute']);
}