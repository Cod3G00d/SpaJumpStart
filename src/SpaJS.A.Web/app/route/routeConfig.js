var app;
(function (app) {
    'use strict';
    var Config = (function () {
        function Config($routeProvider, $modalProvider) {
            $routeProvider
                .when("/", {
                templateUrl: "/app/templates/customers/customersView.html",
                controller: "CustomersCtrl as vm"
            })
                .otherwise({ redirectTo: '/' });
        }
        return Config;
    })();
})(app || (app = {}));
