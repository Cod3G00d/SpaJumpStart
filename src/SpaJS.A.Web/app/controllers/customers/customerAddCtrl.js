var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var customers;
        (function (customers) {
            var CustomerAddCtrl = (function () {
                function CustomerAddCtrl($location, constantsService, dataService) {
                    var _this = this;
                    this.$location = $location;
                    this.constantsService = constantsService;
                    this.dataService = dataService;
                    this.add = function () {
                        var resource = _this.constantsService.baseUri + _this.constantsService.postUri;
                        _this.dataService.add(resource, _this.customer)
                            .then(function (result) {
                            _this.$location.path('/');
                        });
                    };
                    var self = this;
                    self.resource = self.constantsService.baseUri + this.constantsService.postUri;
                }
                CustomerAddCtrl.$inject = ['$location', 'constantsService', 'dataService'];
                return CustomerAddCtrl;
            })();
            angular
                .module('sampleAngularApp')
                .controller('customerAddCtrl', CustomerAddCtrl);
        })(customers = controllers.customers || (controllers.customers = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
