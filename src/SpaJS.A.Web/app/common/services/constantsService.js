/*
HttpService to define an api URI to use across our application
*/
var app;
(function (app) {
    var common;
    (function (common) {
        var services;
        (function (services) {
            //Only export the service and not the interface
            var ConstantsService = (function () {
                //static $inject = [];
                function ConstantsService() {
                    this.appTitle = "Sample Spa App: Customer Interactions With Promises";
                    this.baseUri = "http://localhost:1625";
                    this.postUri = "/api/Customer/";
                }
                return ConstantsService;
            })();
            services.ConstantsService = ConstantsService;
            angular.module("sampleAngularApp")
                .service("constantsService", app.common.services.ConstantsService);
        })(services = common.services || (common.services = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
//# sourceMappingURL=constantsService.js.map