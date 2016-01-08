var app;
(function (app) {
    var customers;
    (function (customers) {
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
            //modalCustomer: app.domain.Customer;
            //static $inject = ['$scope', '$modalInstance', 'customer'];
            CustomerModalCtrl.$inject = ['$modalInstance', 'customer'];
            return CustomerModalCtrl;
        })();
        customers.CustomerModalCtrl = CustomerModalCtrl;
        angular.module("sampleAngularApp")
            .controller("customerModalCtrl", app.customers.CustomerModalCtrl);
    })(customers = app.customers || (app.customers = {}));
})(app || (app = {}));
//# sourceMappingURL=customerModalCtrl.js.map