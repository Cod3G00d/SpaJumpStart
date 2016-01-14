var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var customers;
        (function (customers) {
            var CustomersCtrl = (function () {
                function CustomersCtrl($scope, constantsService, dataService, $modal) {
                    var _this = this;
                    this.$scope = $scope;
                    this.constantsService = constantsService;
                    this.dataService = dataService;
                    this.$modal = $modal;
                    this.getCustomers = function (fetchFromService) {
                        var self = _this;
                        _this.loadingCustomers = true;
                        _this.dataService.get(_this.resource, fetchFromService).then(function (data) {
                            if (_this.$scope.Customers.length == 0) {
                                _this.$scope.Customers = data;
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
                                _this.loadingCustomers = false;
                                _this.totalCount = self.$scope.Customers.length;
                                alert('retreived:' + self.$scope.Customers.length);
                            }
                        });
                    };
                    this.getCustomersById = function (Id) {
                        var self = _this;
                        _this.dataService.getSingle(_this.resource + Id).then(function (result) {
                            _this.$scope.customer = result;
                        });
                    };
                    this.saveCustomer = function (customer) {
                        var self = _this;
                        _this.dataService.add(_this.resource, customer).then(function (result) {
                            self.$scope.Customers.push(customer);
                            self.getCustomers(true);
                        }, function (response) {
                            console.log(response);
                        });
                    };
                    this.updateCustomer = function (customer) {
                        var self = _this;
                        _this.dataService.update(_this.resource, customer).then(function (result) {
                        }, function (response) {
                            self.getCustomers(true);
                            console.log(response);
                        });
                    };
                    this.deleteCustomer = function (customerId) {
                        var self = _this;
                        _this.dataService.remove(_this.resource + customerId).then(function (result) {
                            for (var i = 0; i < self.$scope.Customers.length; i++) {
                                if (self.$scope.Customers[i].Id == customerId) {
                                    self.$scope.Customers.splice(i, 1);
                                    return;
                                }
                            }
                            self.getCustomers(true);
                        });
                    };
                    this.remove = function (customerId) {
                        var self = _this;
                        if (confirm('Are you sure you want to delete this customer?')) {
                            self.deleteCustomer(customerId);
                            self.getCustomers(true);
                        }
                        ;
                    };
                    this.add = function () {
                        var self = _this;
                        var options = {
                            animation: true,
                            templateUrl: 'app/views/customers/addCustomerView.html',
                            controller: 'customerModalCtrl',
                            controllerAs: 'modal',
                            size: 'lg',
                            backdrop: 'static',
                            resolve: {
                                customer: function () { return _this.$scope.customer; }
                            }
                        };
                        _this.$modal.open(options)
                            .result
                            .then(function (customer) {
                            if (customer != null) {
                                self.saveCustomer(customer);
                                self.getCustomers(true);
                            }
                        }, function (event) {
                        });
                    };
                    this.edit = function (editCustomer) {
                        var self = _this;
                        var options = {
                            animation: true,
                            templateUrl: 'app/views/customers/addCustomerView.html',
                            controller: 'customerModalCtrl',
                            controllerAs: 'modal',
                            size: 'lg',
                            backdrop: 'static',
                            resolve: {
                                customer: function () { return editCustomer; }
                            }
                        };
                        _this.$modal.open(options)
                            .result
                            .then(function (updateCustomer) {
                            if (updateCustomer != null) {
                                self.updateCustomer(updateCustomer);
                            }
                            else {
                            }
                        });
                    };
                    var self = this;
                    this.resource = constantsService.baseUri + constantsService.postUri;
                    self.page = 0;
                    self.pagesCount = 5;
                    self.totalCount = 0;
                    self.$scope.Customers = [];
                    self.getCustomers(true);
                }
                CustomersCtrl.prototype.search = function () {
                };
                CustomersCtrl.prototype.refresh = function () {
                    alert('length:' + this.$scope.Customers.length);
                    this.getCustomers(true);
                };
                CustomersCtrl.$inject = ['$scope', 'constantsService', 'dataService', '$modal'];
                return CustomersCtrl;
            })();
            customers.CustomersCtrl = CustomersCtrl;
            angular
                .module("sampleAngularApp")
                .controller("customersCtrl", app.controllers.customers.CustomersCtrl);
        })(customers = controllers.customers || (controllers.customers = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
