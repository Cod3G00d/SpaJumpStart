var app;
(function (app) {
    'use strict';
    /*
    Typescript class to define the routing module, encaspulating angular routing
    
    To accomplish routing we inject the $routingProvider of type definiton file: ng.route.IRouteProvider
    in the class constructor

    */
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
//# sourceMappingURL=routeConfig.js.map