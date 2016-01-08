///<reference path="../../common/services/dataService.ts"/>
///<reference path="../../common/services/constantsService.ts"/>
///<reference path="../../domain/Customer.ts"/>
///<reference path="../../../Scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />

module app.controllers.customers {
    'use strict';

    angular.module("sampleAngularApp")
        .controller("CustomersCtrl", app.controllers.customers.CustomersCtrl);
    
    /*
    Any property you need to be exposed through your controller needs to be declared in the interface being implemented

    So we expose the following properties and methods

    N.B. http://stackoverflow.com/questions/27764720/shouldworkcontroller-is-not-a-function-got-undefined

    */

    //interface ICustomersViewModel extends ng.IScope {
    interface ICustomersViewModel {
        Customers: Array<app.domain.ICustomer>
        customer: app.domain.Customer;
        edit(customer: app.domain.Customer): void;
        remove(Id: number): void;
        add(): void;
        refresh: () => void;

        //pageClass: string;
        loadingCustomers: boolean;
        page: number;
        pagesCount: number;
        totalCount: number;

    }

    export class CustomersCtrl implements ICustomersViewModel {
        Customers: Array<app.domain.ICustomer>
        customer: app.domain.Customer;

        loadingCustomers: boolean;
        page: number;
        pagesCount: number;
        totalCount: number;

        resource: string;
        scope: any;

        /*
        Injected our custom services constantsService and dataService to make the Web API calls
        */
        //static $inject = ['constantsService', 'dataService', '$modal'];
        static $inject = ['$scope', 'constantsService', 'dataService', '$modal'];

        constructor(
            public $scope: any,
            //private $scope: ICustomersViewModel,
            private constantsService: app.common.services.ConstantsService,
            private dataService: app.common.services.DataService,
            private $modal: ng.ui.bootstrap.IModalService)
        {

            var self = this;
            this.resource = constantsService.baseUri + constantsService.postUri;
            //this.scope = $scope;
            //self.pageClass = 'page-customers';
            self.page = 0;
            self.pagesCount = 5;
            self.totalCount = 0;

            this.scope = $scope;

            self.Customers = [];

            //Load Customers
            self.getCustomers(true);
        }

        search(): void
        {
        }

        refresh(): void
        {

            alert('length:' + this.Customers.length);

            this.getCustomers(true);
            //this.scope.$apply();
        }

        //Queries 

        //Customers not updating on refresh
        //Take a look at : http://kwilson.me.uk/blog/writing-cleaner-angularjs-with-typescript-and-controlleras/

        getCustomers(fetchFromService: boolean): void
        {

            var self = this; // Attention here.. check 'this' in TypeScript and JavaScript
            this.loadingCustomers = true;

            this.dataService.get(this.resource, fetchFromService).then((data: app.domain.Customer[]) =>
            {

                //this.Customers = data;
                if (this.Customers.length == 0)
                {
                    this.Customers = data;
                }
                else
                {
                    if (data != null)
                    {
                        for (var i = 0; i < data.length; i++)
                        {
                            if (self.Customers[i].CustomerId == data[i].CustomerId)
                            {
                                self.Customers[i] = data[i];

                            }
                            else
                            {
                                self.Customers.push(data[i]);
                            }
                        }
                    }
  
                    //if (data != null) {
                    //    //if (self.Customers != null) {
                    //    //    self.Customers.splice(0, self.Customers.length);
                    //    //    self.Customers = self.Customers.concat(data);
                    //    //}
                    //    //else {
                    //    //    self.Customers = data;
                    //    //}
                    //    self.Customers = data;
                    //}

                    this.loadingCustomers = false;
                    this.totalCount = self.Customers.length;
                    alert('retreived:' + self.Customers.length);
                }
            });
        }

        getCustomersById(Id: number): void
        {
            var self = this;
            this.dataService.getSingle(this.resource + Id).then((result: app.domain.Customer) =>
            {
                this.customer = result;
            });
        }
 
        //Commands

        saveCustomer(customer): void
        {
            var self = this;
            this.dataService.add(this.resource, customer).then(
                function (result)
                {
                    self.Customers.push(customer);
                    self.getCustomers(true);
                },
                function (response)
                {
                    console.log(response);
                });
        }

        updateCustomer(customer): void
        {
            var self = this;
            this.dataService.update(this.resource, customer).then(
                function (result)
                {
                    //this.Customers.push(customer);
                },
                function (response) {
                    self.getCustomers(true);
                    console.log(response);
                });
        }

        deleteCustomer(customerId): void
        {
            var self = this;
            this.dataService.remove(this.resource + customerId).then(
                function (result)
                {

                    for (var i = 0; i < self.Customers.length; i++)
                    {
                        if (self.Customers[i].CustomerId == customerId)
                        {
                            self.Customers.splice(i, 1);
                            return;
                        }
                    }
                    self.getCustomers(true);
                });
        }

        remove(customerId: number): void
        {
            var self = this; // Attention here.. check 'this' in TypeScript and JavaScript

            if (confirm('Are you sure you want to delete this customer?'))
            {
                self.deleteCustomer(customerId);
                self.getCustomers(true);
            };
        }

        //Modals

        add(): void
        {
            var self = this;

            var options: ng.ui.bootstrap.IModalSettings =
                {
                    animation: true,
                    templateUrl: 'app/templates/customers/addCustomer.html',
                    controller: 'customerModalCtrl',
                    controllerAs: 'modal',
                    size: 'lg',
                    backdrop: 'static',
                    resolve: {
                        customer: () => this.customer
                }
            };

            this.$modal.open(options)
                .result
                .then(function (customer)
                {
                    if (customer != null) {
                        self.saveCustomer(customer);
                        self.getCustomers(true);
                    }
                },
                function (event) {

                });
        }

        edit(editCustomer: app.domain.Customer): void
        {
            var self = this;
            //this.scope.customer = editCustomer;

            var options: ng.ui.bootstrap.IModalSettings =
            {
                animation: true,
                templateUrl: 'app/templates/customers/addCustomerView.html',
                controller: 'customerModalCtrl',
                controllerAs: 'modal',
                size: 'lg',
                backdrop: 'static',
                //scope: this.scope,
                //this should pass in customer from the customer view         
                resolve:
                {
                    customer: () => editCustomer
                }
            };

            this.$modal.open(options)
                .result
                .then(function (updateCustomer)
                {
                    if (updateCustomer != null)
                    {
                        self.updateCustomer(updateCustomer);
                        //self.getCustomers(true);
                    }
                    else
                    {
                        //this.saveCustomer(customer);
                    }
                });
        }
    }
}