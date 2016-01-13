var app;
(function (app) {
    var route;
    (function (route) {
        'use strict';
        var RouteConfig = (function () {
            function RouteConfig($routeProvider, $modalProvider) {
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
            }
            RouteConfig.$inject = ["$routeProvider"];
            return RouteConfig;
        })();
        route.RouteConfig = RouteConfig;
    })(route = app.route || (app.route = {}));
})(app || (app = {}));
