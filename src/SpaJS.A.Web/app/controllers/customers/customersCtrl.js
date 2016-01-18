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
                    this.refresh = function () {
                        var self = _this;
                        self.getCustomers(true);
                    };
                    this.getCustomers = function (fetchFromService) {
                        var self = _this;
                        self.$scope.loadingCustomers = true;
                        self.dataService.get(self.resource, fetchFromService)
                            .then(function (data) {
                            if (data != null) {
                                self.$scope.Customers = data;
                            }
                            self.$scope.loadingCustomers = false;
                            self.$scope.totalCount = self.$scope.Customers.length;
                        })
                            .then(function (reason) {
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
                                if (self.$scope.Customers[i].id == customerId) {
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
                    self.resource = constantsService.baseUri + constantsService.postUri;
                    self.$scope.page = 0;
                    self.$scope.pagesCount = 5;
                    self.$scope.totalCount = 0;
                    self.$scope.Customers = new Array();
                    self.getCustomers(true);
                }
                CustomersCtrl.prototype.search = function () {
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
