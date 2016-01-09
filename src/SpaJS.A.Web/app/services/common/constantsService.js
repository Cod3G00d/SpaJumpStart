/*
HttpService to define an api URI to use across our application
*/
///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference_path="IConstantsService.ts" />
var app;
(function (app) {
    var services;
    (function (services) {
        var common;
        (function (common) {
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
            common.ConstantsService = ConstantsService;
            angular.module("sampleAngularApp")
                .service("constantsService", app.services.common.ConstantsService);
        })(common = services.common || (services.common = {}));
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=constantsService.js.map