var app;
(function (app) {
    var postAdd;
    (function (postAdd) {
        var CustomerAddCtrl = (function () {
            function CustomerAddCtrl($location, constantsService, dataService) {
                this.$location = $location;
                this.constantsService = constantsService;
                this.dataService = dataService;
                var self = this;
                self.resource = self.constantsService.baseUri + this.constantsService.postUri;
            }
            CustomerAddCtrl.prototype.add = function () {
                var _this = this;
                var resource = this.constantsService.baseUri + this.constantsService.postUri;
                this.dataService.add(resource, this.customer)
                    .then(function (result) {
                    alert(result.CustomerId + ' submitted successfully');
                    _this.$location.path('/');
                });
            };
            CustomerAddCtrl.$inject = ['$location', 'constantsService', 'dataService'];
            return CustomerAddCtrl;
        })();
        angular.module('sampleAngularApp')
            .controller('customerAddCtrl', CustomerAddCtrl);
    })(postAdd = app.postAdd || (app.postAdd = {}));
})(app || (app = {}));
//# sourceMappingURL=customerAddCtrl.js.map