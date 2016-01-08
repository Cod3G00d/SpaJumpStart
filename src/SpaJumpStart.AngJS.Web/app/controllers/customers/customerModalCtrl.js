var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var customers;
        (function (customers) {
            'use strict';
            angular.module("sampleAngularApp").controller("customerModalCtrl", app.controllers.customers.CustomerModalCtrl);
            var CustomerModalCtrl = (function () {
                function CustomerModalCtrl($modalInstance, customer) {
                    this.$modalInstance = $modalInstance;
                    this.customer = customer;
                    this.modalCustomer = customer;
                }
                //constructor(public $scope: any, private $modalInstance: ng.ui.bootstrap.IModalServiceInstance) {
                //    this.scope = $scope;
                //}
                CustomerModalCtrl.prototype.ok = function () {
                    this.$modalInstance.close(this.modalCustomer);
                };
                CustomerModalCtrl.prototype.cancel = function () {
                    this.$modalInstance.dismiss('cancel');
                };
                CustomerModalCtrl.controllerId = 'customerModalCtrl';
                //static $inject = ['$scope', '$modalInstance', 'customer'];
                CustomerModalCtrl.$inject = ['$modalInstance', 'customer'];
                return CustomerModalCtrl;
            })();
            customers.CustomerModalCtrl = CustomerModalCtrl;
        })(customers = controllers.customers || (controllers.customers = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
