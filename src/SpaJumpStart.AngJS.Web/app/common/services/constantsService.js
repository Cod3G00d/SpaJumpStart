/*
HttpService to define an api URI to use across our application
*/
var app;
(function (app) {
    var common;
    (function (common) {
        var services;
        (function (services) {
            'use strict';
            angular.module("sampleAngularApp")
                .service("constantsService", app.common.services.ConstantsService);
            //Only export the service and not the interface
            var ConstantsService = (function () {
                //static $inject = [];
                function ConstantsService() {
                    this.appTitle = "Sample Spa App: Customer Interactions With Promises";
                    this.baseUri = "http://localhost:5196";
                    this.postUri = "/api/customers/";
                }
                return ConstantsService;
            })();
            services.ConstantsService = ConstantsService;
        })(services = common.services || (common.services = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
