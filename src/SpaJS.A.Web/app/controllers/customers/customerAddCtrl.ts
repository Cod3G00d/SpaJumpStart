///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../domain/Customer.ts"/>

module app.controllers.customers {

    interface IAddCustomerViewModel {
        customer: app.domain.ICustomer;
        add(): void;
    }

    class CustomerAddCtrl implements IAddCustomerViewModel {

        customer: app.domain.ICustomer;
        private resource: string;

        static $inject = ['$location', 'constantsService', 'dataService'];
        constructor(private $location: ng.ILocationService,
            private constantsService: app.services.common.IConstantsService,
            private dataService: app.services.common.IDataService) {

            var self = this;
            self.resource = self.constantsService.baseUri + this.constantsService.postUri;
        }

        add(): void {
            var resource = this.constantsService.baseUri + this.constantsService.postUri;
            this.dataService.add(resource, this.customer)
                .then((result: app.domain.ICustomer) => {
                    alert(result.CustomerId + ' submitted successfully');
                    this.$location.path('/');
                });
        }
    }

    angular.module('sampleAngularApp')
        .controller('customerAddCtrl', CustomerAddCtrl);
}