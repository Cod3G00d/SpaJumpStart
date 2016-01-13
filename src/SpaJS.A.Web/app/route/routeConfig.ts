///<reference path="../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../Scripts/typings/angularjs/angular-route.d.ts" />
///<reference path="../../Scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />

module app.route {
    'use strict';
    /*
    Typescript class to define the routing module, encaspulating angular routing
    
    To accomplish routing we inject the $routingProvider of type definiton file: ng.route.IRouteProvider 
    in the class constructor

    */

    export class RouteConfig {

        static $inject = ["$routeProvider"];

        constructor(
            $routeProvider: ng.route.IRouteProvider,
            $modalProvider: ng.ui.bootstrap.IModalProvider) {

            $routeProvider
                .when("/", {
                    templateUrl: "/app/views/customers/customersView.html",
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
                .when("/about", {
                    templateUrl: "/app/views/about.html"
                })
                .otherwise({
                    templateUrl: '/app/views/shared/_404.html'
                })
        }
    }
}
//register the service module with angularjs
//angular
//    .module('sampleAngularApp')
//    .config(app.route.RouteConfig);
    //.run(checkAuthentication); 

