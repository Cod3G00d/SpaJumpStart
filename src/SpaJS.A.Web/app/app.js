var app;
(function (app) {
    'use strict';
    var Config = (function () {
        function Config($routeProvider, $httpProvider) {
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
            });
            $httpProvider.interceptors.push('xmlHttpInterceptorService');
            if (!$httpProvider.defaults.headers.get) {
            }
            ;
        }
        return Config;
    })();
    app.Config = Config;
    var mainApp = angular.module('sampleAngularApp', [
        'ngAnimate', 'ngCookies', 'ngRoute', 'ui.bootstrap', 'ui.bootstrap.tpls'
    ]);
    mainApp
        .config(Config)
        .run(checkAuthentication);
    checkAuthentication.$inject = ['$rootScope', '$location', 'tokenHandlerService'];
    function checkAuthentication($rootScope, $location, tokenHandlerService) {
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
    Config.$inject = ['$routeProvider', '$httpProvider'];
})(app || (app = {}));
