var app;
(function (app) {
    var services;
    (function (services) {
        var common;
        (function (common) {
            var DataService = (function () {
                function DataService($http, $q) {
                    var _this = this;
                    this.get = function (resource, fetchFromService) {
                        var self = _this;
                        return getAllFromService();
                        function getAllFromService() {
                            var deferred = self._qService.defer();
                            self._httpService.get(resource).then(function (result) {
                                JSON.stringify(result.data);
                                deferred.resolve(result.data);
                            }, function (error) {
                                deferred.reject(error);
                            });
                            return deferred.promise;
                        }
                    };
                    this.getSingle = function (resource) {
                        var self = _this;
                        var deferred = self._qService.defer();
                        self._httpService.get(resource).then(function (result) {
                            deferred.resolve(result.data);
                        }, function (error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };
                    this.add = function (resource, entity) {
                        var self = _this;
                        var deferred = self._qService.defer();
                        self._httpService.post(resource, entity).then(function (result) {
                            deferred.resolve(result.data);
                        }, function (error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };
                    this.update = function (resource, entity) {
                        var self = _this;
                        var deferred = self._qService.defer();
                        self._httpService.put(resource, entity).then(function (data) {
                            deferred.resolve(data);
                        }, function (error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };
                    this.remove = function (resource) {
                        var self = _this;
                        var deferred = self._qService.defer();
                        self._httpService.delete(resource).then(function (data) {
                            deferred.resolve(data);
                        }, function (error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };
                    this._httpService = $http;
                    this._qService = $q;
                }
                DataService.$inject = ['$http', '$q'];
                return DataService;
            })();
            common.DataService = DataService;
            angular
                .module("sampleAngularApp")
                .service("dataService", app.services.common.DataService);
        })(common = services.common || (services.common = {}));
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
