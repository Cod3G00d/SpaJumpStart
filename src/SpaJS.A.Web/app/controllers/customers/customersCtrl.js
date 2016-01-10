var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var customers;
        (function (customers) {
            var CustomersCtrl = (function () {
                function CustomersCtrl($scope, constantsService, dataService, $modal) {
                    this.$scope = $scope;
                    this.constantsService = constantsService;
                    this.dataService = dataService;
                    this.$modal = $modal;
                    var self = this;
                    this.resource = constantsService.baseUri + constantsService.postUri;
                    self.page = 0;
                    self.pagesCount = 5;
                    self.totalCount = 0;
                    this.scope = $scope;
                    self.Customers = [];
                    self.getCustomers(true);
                }
                CustomersCtrl.prototype.search = function () {
                };
                CustomersCtrl.prototype.refresh = function () {
                    alert('length:' + this.Customers.length);
                    this.getCustomers(true);
                };
                CustomersCtrl.prototype.getCustomers = function (fetchFromService) {
                    var _this = this;
                    var self = this;
                    this.loadingCustomers = true;
                    this.dataService.get(this.resource, fetchFromService).then(function (data) {
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
                    var self = this;
                    if (confirm('Are you sure you want to delete this customer?')) {
                        self.deleteCustomer(customerId);
                        self.getCustomers(true);
                    }
                    ;
                };
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
                    var options = {
                        animation: true,
                        templateUrl: 'app/templates/customers/addCustomerView.html',
                        controller: 'customerModalCtrl',
                        controllerAs: 'modal',
                        size: 'lg',
                        backdrop: 'static',
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
                CustomersCtrl.$inject = ['$scope', 'constantsService', 'dataService', '$modal'];
                return CustomersCtrl;
            })();
            customers.CustomersCtrl = CustomersCtrl;
            angular.module("sampleAngularApp")
                .controller("customersCtrl", app.controllers.customers.CustomersCtrl);
        })(customers = controllers.customers || (controllers.customers = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
