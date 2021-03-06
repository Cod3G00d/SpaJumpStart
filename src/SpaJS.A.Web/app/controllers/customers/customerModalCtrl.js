var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var customers;
        (function (customers) {
            var CustomerModalCtrl = (function () {
                function CustomerModalCtrl($scope, $modalInstance, customer) {
                    this.$scope = $scope;
                    this.$modalInstance = $modalInstance;
                    this.customer = customer;
                    this.modalCustomer = customer;
                }
                CustomerModalCtrl.prototype.ok = function () {
                    this.$modalInstance.close(this.modalCustomer);
                };
                CustomerModalCtrl.prototype.cancel = function () {
                    this.$modalInstance.dismiss('cancel');
                };
                CustomerModalCtrl.controllerId = 'customerModalCtrl';
                CustomerModalCtrl.$inject = ['$scope', '$modalInstance', 'customer'];
                return CustomerModalCtrl;
            })();
            customers.CustomerModalCtrl = CustomerModalCtrl;
            angular.module("sampleAngularApp")
                .controller("customerModalCtrl", app.controllers.customers.CustomerModalCtrl);
        })(customers = controllers.customers || (controllers.customers = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
