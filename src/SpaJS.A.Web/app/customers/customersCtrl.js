///<reference path="../common/services/dataService.ts"/>
///<reference path="../common/services/constantsService.ts"/>
///<reference path="../domain/Customer.ts"/>
///<reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
var app;
(function (app) {
    var customers;
    (function (customers) {
        var CustomersCtrl = (function () {
            function CustomersCtrl($scope, 
                //private $scope: ICustomersViewModel,
                constantsService, dataService, $modal) {
                this.$scope = $scope;
                this.constantsService = constantsService;
                this.dataService = dataService;
                this.$modal = $modal;
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
            CustomersCtrl.prototype.search = function () {
            };
            CustomersCtrl.prototype.refresh = function () {
                alert('length:' + this.Customers.length);
                this.getCustomers(true);
                //this.scope.$apply();
            };
            //Queries 
            //Customers not updating on refresh
            //Take a look at : http://kwilson.me.uk/blog/writing-cleaner-angularjs-with-typescript-and-controlleras/
            CustomersCtrl.prototype.getCustomers = function (fetchFromService) {
                var _this = this;
                var self = this; // Attention here.. check 'this' in TypeScript and JavaScript
                this.loadingCustomers = true;
                this.dataService.get(this.resource, fetchFromService).then(function (data) {
                    //this.Customers = data;
                    if (_this.Customers.length == 0) {
                        _this.Customers = data;
                    }
                    else {
                        if (data != null) {
                            for (var i = 0; i < data.length; i++) {
                                if (self.Customers[i].CustomerId == data[i].CustomerId) {
                                    self.Customers[i] = data[i];
                                }
                                else {
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
                        _this.loadingCustomers = false;
                        _this.totalCount = self.Customers.length;
                        alert('retreived:' + self.Customers.length);
                    }
                });
            };
            CustomersCtrl.prototype.getCustomersById = function (Id) {
                var _this = this;
                var self = this;
                this.dataService.getSingle(this.resource + Id).then(function (result) {
                    _this.customer = result;
                });
            };
            //Commands
            CustomersCtrl.prototype.saveCustomer = function (customer) {
                var self = this;
                this.dataService.add(this.resource, customer).then(function (result) {
                    self.Customers.push(customer);
                    self.getCustomers(true);
                }, function (response) {
                    console.log(response);
                });
            };
            CustomersCtrl.prototype.updateCustomer = function (customer) {
                var self = this;
                this.dataService.update(this.resource, customer).then(function (result) {
                    //this.Customers.push(customer);
                }, function (response) {
                    self.getCustomers(true);
                    console.log(response);
                });
            };
            CustomersCtrl.prototype.deleteCustomer = function (customerId) {
                var self = this;
                this.dataService.remove(this.resource + customerId).then(function (result) {
                    for (var i = 0; i < self.Customers.length; i++) {
                        if (self.Customers[i].CustomerId == customerId) {
                            self.Customers.splice(i, 1);
                            return;
                        }
                    }
                    self.getCustomers(true);
                });
            };
            CustomersCtrl.prototype.remove = function (customerId) {
                var self = this; // Attention here.. check 'this' in TypeScript and JavaScript
                if (confirm('Are you sure you want to delete this customer?')) {
                    self.deleteCustomer(customerId);
                    self.getCustomers(true);
                }
                ;
            };
            //Modals
            CustomersCtrl.prototype.add = function () {
                var _this = this;
                var self = this;
                var options = {
                    animation: true,
                    templateUrl: 'app/templates/customers/addCustomerView.html',
                    controller: 'customerModalCtrl',
                    controllerAs: 'modal',
                    size: 'lg',
                    backdrop: 'static',
                    resolve: {
                        customer: function () { return _this.customer; }
                    }
                };
                this.$modal.open(options)
                    .result
                    .then(function (customer) {
                    if (customer != null) {
                        self.saveCustomer(customer);
                        self.getCustomers(true);
                    }
                }, function (event) {
                });
            };
            CustomersCtrl.prototype.edit = function (editCustomer) {
                var self = this;
                //this.scope.customer = editCustomer;
                var options = {
                    animation: true,
                    templateUrl: 'app/templates/customers/addCustomerView.html',
                    controller: 'customerModalCtrl',
                    controllerAs: 'modal',
                    size: 'lg',
                    backdrop: 'static',
                    //scope: this.scope,
                    //this should pass in customer from the customer view         
                    resolve: {
                        customer: function () { return editCustomer; }
                    }
                };
                this.$modal.open(options)
                    .result
                    .then(function (updateCustomer) {
                    if (updateCustomer != null) {
                        self.updateCustomer(updateCustomer);
                    }
                    else {
                    }
                });
            };
            /*
            Injected our custom services constantsService and dataService to make the Web API calls
            */
            //static $inject = ["constantsService", "dataService", "$uibModal"];
            //static $inject = ['constantsService', 'dataService', '$modal'];
            CustomersCtrl.$inject = ['$scope', 'constantsService', 'dataService', '$modal'];
            return CustomersCtrl;
        })();
        customers.CustomersCtrl = CustomersCtrl;
        angular.module("sampleAngularApp")
            .controller("CustomersCtrl", app.customers.CustomersCtrl);
    })(customers = app.customers || (app.customers = {}));
})(app || (app = {}));
//# sourceMappingURL=customersCtrl.js.map