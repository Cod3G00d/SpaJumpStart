///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../services/common/dataService.ts"/>
///<reference path="../../services/common/constantsService.ts"/>
///<reference path="../../domain/Customer.ts"/>

module app.controllers.customers {

    /*
    Any property you need to be exposed through your controller needs to be declared in the interface being implemented

    So we expose the following properties and methods

    N.B. http://stackoverflow.com/questions/27764720/shouldworkcontroller-is-not-a-function-got-undefined

    */
    
    /*
    NG-REPEAT PROBS
    See this as there's a problem with the repeater not refreshing - best practices for injecting scope by extending it

    http://www.software-architects.com/devblog/2014/06/04/Learn-by-Example-AngularJS-NodeJS-and-Typescript
    https://kodeyak.wordpress.com/2014/02/12/angularjs-via-typescript-controllers/

    SEE
    http://stackoverflow.com/questions/12977894/what-is-the-angularjs-way-to-databind-many-inputs/13782671#13782671
    http://stackoverflow.com/questions/12977894/what-is-the-angularjs-way-to-databind-many-inputs/13782671#13782671
    */

    //interface ICustomersViewModel extends ng.IScope {
    export interface ICustomersViewModel {
        Customers: Array<app.domain.ICustomer>
        customer: app.domain.ICustomer;
        edit(customer: app.domain.Customer): void;
        remove(Id: number): void;
        add(): void;
        refresh: ()=> void;

        //pageClass: string;
        loadingCustomers: boolean;
        page: number;
        pagesCount: number;
        totalCount: number;

    }

    //export class CustomersCtrl implements ICustomersViewModel {
    export class CustomersCtrl {
        //Customers: Array<app.domain.ICustomer>
        //customer: app.domain.ICustomer;
        
        //pageClass: string 
        loadingCustomers: boolean;
        page: number;
        pagesCount: number;
        totalCount: number;

        resource: string;
        //_$scope: any;

        /*
        Injected our custom services constantsService and dataService to make the Web API calls
        */
        static $inject = ['$scope','constantsService', 'dataService', '$modal'];
        
        //see: https://kodeyak.wordpress.com/2014/02/12/angularjs-via-typescript-controllers/

        constructor(
            private $scope: ICustomersViewModel,
            //private $scope: ICustomersViewModel,
            private constantsService: app.services.common.IConstantsService,
            private dataService: app.services.common.IDataService,
            private $modal: ng.ui.bootstrap.IModalService) {

            var self = this;
            this.resource = constantsService.baseUri + constantsService.postUri;
            //this.scope = $scope;
            //self.pageClass = 'page-customers';
            self.page = 0;
            self.pagesCount = 5;
            self.totalCount = 0;

            //this._$scope = $scope;
            
            //self.Customers = [];
            self.$scope.Customers = [];

            //Load Customers
            self.getCustomers(true);
        }

        search(): void {

        }

        refresh(): void {
            
            //alert('length:' + this.Customers.length);
            alert('length:' + this.$scope.Customers.length);

            this.getCustomers(true);
            //this.scope.$apply();
        }


        //Queries 

        //Customers not updating on refresh
        //Take a look at : http://kwilson.me.uk/blog/writing-cleaner-angularjs-with-typescript-and-controlleras/

        getCustomers = (fetchFromService: boolean): void =>
        {

            var self = this; // Attention here.. check 'this' in TypeScript and JavaScript
            this.loadingCustomers = true;

            self.dataService.get(self.resource, fetchFromService)
                .then((data: app.domain.Customer[]) =>
                {

                    if (this.$scope.Customers.length == 0) {
                        this.$scope.Customers = data;
                    }
                    else {
                        if (data != null) {
                            for (var i = 0; i < data.length; i++) {
                                if (self.$scope.Customers[i].Id == data[i].Id) {
                                    self.$scope.Customers[i] = data[i];

                                }
                                else {
                                    self.$scope.Customers.push(data[i]);
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
                        this.totalCount = self.$scope.Customers.length;
                        alert('retreived:' + self.$scope.Customers.length);
                    }   
                })
                .then((reason) => {
                    alert('An Error occurred:' + self.$scope.Customers.length);
                    
                });
        }

        getCustomersById = (Id: number): void => {
            var self = this;
            this.dataService.getSingle(this.resource + Id).then((result: app.domain.Customer) => {
                this.$scope.customer = result;
            });
        }
 

        //Commands

        saveCustomer = (customer): void => {
            var self = this; 
            this.dataService.add(this.resource, customer).then(
                function (result) {
                    self.$scope.Customers.push(customer);
                    self.getCustomers(true);
                },
                function (response) {
                    console.log(response);
                });
        }

        updateCustomer = (customer): void => {
            var self = this; 
            this.dataService.update(this.resource, customer).then(
                function (result) {
                    //this.Customers.push(customer);
                },
                function (response) {
                    self.getCustomers(true);
                    console.log(response);
                });
        }

        deleteCustomer = (customerId): void => {
            var self = this;
            this.dataService.remove(this.resource + customerId).then(
                function (result) {

                    for (var i = 0; i < self.$scope.Customers.length; i++) {
                        if (self.$scope.Customers[i].Id == customerId) {
                            self.$scope.Customers.splice(i, 1);
                            return;
                        }
                    }
                    self.getCustomers(true);
                });
        }

        remove = (customerId: number): void => {
            var self = this; // Attention here.. check 'this' in TypeScript and JavaScript

            if (confirm('Are you sure you want to delete this customer?')) {
                self.deleteCustomer(customerId);
                self.getCustomers(true);
            };
        }

        //Modals

        add = (): void => {
            var self = this; 

            var options: ng.ui.bootstrap.IModalSettings = {
                animation: true,
                templateUrl: 'app/views/customers/addCustomerView.html',
                controller: 'customerModalCtrl',
                controllerAs: 'modal',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    customer: () => this.$scope.customer
                }
            };

            this.$modal.open(options)
                .result
                .then(function (customer) {
                    if (customer != null) {
                        self.saveCustomer(customer);
                        self.getCustomers(true);
                    }
                },
                function (event) {

                });
        }

        edit = (editCustomer: app.domain.Customer): void => {
            var self = this;
            //this.scope.customer = editCustomer;

            var options: ng.ui.bootstrap.IModalSettings = {
                animation: true,
                templateUrl: 'app/views/customers/addCustomerView.html',
                controller: 'customerModalCtrl',
                controllerAs: 'modal',
                size: 'lg',
                backdrop: 'static',
                //scope: this.scope,
                //this should pass in customer from the customer view         
                resolve: {
                    customer: () => editCustomer
                }
            };

            this.$modal.open(options)
                .result
                .then(function (updateCustomer) {
                    if (updateCustomer != null) {
                        self.updateCustomer(updateCustomer);
                        //self.getCustomers(true);
                        }
                        else {
                            //this.saveCustomer(customer);
                        }
                });
        }
    }
    angular
        .module("sampleAngularApp")
        .controller("customersCtrl", app.controllers.customers.CustomersCtrl);
}