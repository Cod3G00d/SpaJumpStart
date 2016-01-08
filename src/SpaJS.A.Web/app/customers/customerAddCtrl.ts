module app.postAdd {

    interface IAddCustomerViewModel {
        customer: app.domain.ICustomer;
        add(): void;
    }

    class CustomerAddCtrl implements IAddCustomerViewModel {

        customer: app.domain.ICustomer;
        private resource: string;

        static $inject = ['$location', 'constantsService', 'dataService'];
        constructor(private $location: ng.ILocationService,
            private constantsService: app.common.services.ConstantsService,
            private dataService: app.common.services.DataService) {

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