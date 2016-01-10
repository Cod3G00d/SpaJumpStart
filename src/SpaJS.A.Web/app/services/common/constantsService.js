var app;
(function (app) {
    var services;
    (function (services) {
        var common;
        (function (common) {
            var ConstantsService = (function () {
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
