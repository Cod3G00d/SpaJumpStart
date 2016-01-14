///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../domain/Customer.ts"/>

module app.controllers.customers {

    export class CustomerModalCtrl {
        static controllerId = 'customerModalCtrl';

        scope: ng.IScope;
        modalCustomer: app.domain.ICustomer;

        static $inject = ['$scope', '$modalInstance', 'customer'];

        constructor(
            private $scope: ng.IScope,
            private $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private customer: app.domain.ICustomer)
        {
            this.modalCustomer = customer;
        }

        ok() {
            this.$modalInstance.close(this.modalCustomer); 
        }

         cancel() {
            this.$modalInstance.dismiss('cancel');
        }
    }
    angular.module("sampleAngularApp")
        .controller("customerModalCtrl", app.controllers.customers.CustomerModalCtrl);
}