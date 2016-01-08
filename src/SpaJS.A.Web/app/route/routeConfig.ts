module app {
    'use strict';
    /*
    Typescript class to define the routing module, encaspulating angular routing
    
    To accomplish routing we inject the $routingProvider of type definiton file: ng.route.IRouteProvider 
    in the class constructor

    */

    class Config {
        constructor($routeProvider: ng.route.IRouteProvider,
            $modalProvider: ng.ui.bootstrap.IModalProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "/app/templates/customers/customersView.html",
                    controller: "CustomersCtrl as vm"
                })
            //.when("/edit/:id", {
            //templateUrl: "/app/templates/customers/editCustomerView.html",
            //    controller: "CustomerEditCtrl as vm"
            //})
            //.when("/add", {
            //templateUrl: "/app/templates/customers/addCustomerView.html",
            //    controller: "CustomerAddCtrl as vm"
            //})
                .otherwise({ redirectTo: '/' })


            ;
        }

    }
}