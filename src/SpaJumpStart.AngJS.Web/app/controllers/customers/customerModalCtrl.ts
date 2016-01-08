module app.controllers.customers {
    'use strict';    

    angular.module("sampleAngularApp").controller("customerModalCtrl", app.controllers.customers.CustomerModalCtrl);

    export class CustomerModalCtrl
    {
        static controllerId = 'customerModalCtrl';

        //static $inject = ['$scope', '$modalInstance', 'customer'];
        static $inject = ['$modalInstance', 'customer'];
        scope: any;
        modalCustomer: app.domain.Customer;

        constructor(private $modalInstance: ng.ui.bootstrap.IModalServiceInstance, private customer: app.domain.Customer)
        {
            this.modalCustomer = customer;
        }
        //constructor(public $scope: any, private $modalInstance: ng.ui.bootstrap.IModalServiceInstance) {
        //    this.scope = $scope;
        //}

        ok()
        {
            this.$modalInstance.close(this.modalCustomer);
        }

        cancel()
        {
            this.$modalInstance.dismiss('cancel');
        }
    }
}