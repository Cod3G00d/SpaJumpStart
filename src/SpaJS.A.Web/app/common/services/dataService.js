var app;
(function (app) {
    var common;
    (function (common) {
        var services;
        (function (services) {
            /*
            The DataService is being injected with two services $http and $q using the relative Typescript definitions
            */
            var DataService = (function () {
                function DataService($http, $q) {
                    this.httpService = $http;
                    this.qService = $q;
                }
                /*
                Associated Get Functions if the data has already been cached in the localDataArray and fetchFromService is true it will
                NOT call the Web Api again but returned the cached data
                */
                DataService.prototype.get = function (resource, fetchFromService) {
                    var self = this;
                    return getAllFromService();
                    //if (fetchFromService) {
                    //    return getAllFromService();
                    //} else {
                    //    if (self.localCachedEntityData !== undefined) {
                    //        return
                    //        self.qService.when(self.localCachedEntityData);
                    //    } else {
                    //        return getAllFromService();
                    //    }
                    //}
                    function getAllFromService() {
                        //deferred represents a TASK that will finish some point in the future.
                        var deferred = self.qService.defer();
                        //deferred.notify("about to call service");
                        self.httpService.get(resource).then(function (result) {
                            //self.localCachedEntityData = result.data;
                            JSON.stringify(result.data);
                            //deferred.resolve(self.localCachedEntityData);
                            deferred.resolve(result.data);
                        }, function (error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    }
                };
                DataService.prototype.getSingle = function (resource) {
                    var self = this;
                    var deferred = self.qService.defer();
                    self.httpService.get(resource).then(function (result) {
                        deferred.resolve(result.data);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                DataService.prototype.add = function (resource, entity) {
                    var self = this;
                    var deferred = self.qService.defer();
                    self.httpService.post(resource, entity).then(function (result) {
                        deferred.resolve(result.data);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                DataService.prototype.update = function (resource, entity) {
                    var self = this;
                    var deferred = self.qService.defer();
                    self.httpService.put(resource, entity).then(function (data) {
                        deferred.resolve(data);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                DataService.prototype.remove = function (resource) {
                    var self = this;
                    var deferred = self.qService.defer();
                    self.httpService.delete(resource).then(function (data) {
                        deferred.resolve(data);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                //We are using the static injection pattern above the constructor declaration
                DataService.$inject = ['$http', '$q'];
                return DataService;
            })();
            services.DataService = DataService;
            angular.module("sampleAngularApp")
                .service("dataService", app.common.services.DataService);
        })(services = common.services || (common.services = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
//# sourceMappingURL=dataService.js.map