/*
 First thing to notice is that app.domain.EntityBase TypeScript class is accessible because we used the export keyword
 
 All methods in the Data Service are async and return promises

 Promises
 --------
 Semantics of Angular dictate that promises are used as a sort-of "callback handle" ...
     -do something asynchronous
     -return a promise
     -trigger a function

 -promises created using $http

 -$q lets you run functions aysnchrnously, and use their return values (or exceptions) when they are done processing
 - 2 ways of using:
     -deferred implementations
     -ES6 promises
 ES6 $q being used as a constructor which takes a resolver function as the first argument (similar to native promise from ES6 Harmony)
 Note with $q:
 -unlike ES6 behavior, an exception thrown in the constructor function will NOT implicitly reject the promise.
 

 Using:
 -"deferred" promises, can provide status updates using deferred.notify(msg)
 -"then" nesting/chaining promises, transform requests/responses, to control the input and output of the call

 Multiple in-flight promises:
 $q.all lets you chain several callbacks at the same time and use a single then function to join them all
 -calling several urls at the same time, and deferr then convert all callbacks results into a single promise, with an object with
  each answer
 -note: failure causes the entire batch to fail,
 -GOOD for pulling in resources (images etc), BAD for serving Data

 2 types in Angular:
     
     -$q - intergrated with $rootScope.Scope (faster propogation/resolution/rejection in models avoiding UI repaints, and flickering)
         - tiny footprint
     -Q (Kris Kowal's), more features but larger (cost in bytes)

 Links:
 http://www.webdeveasy.com/javascript-promises-and-angularjs-q-service/
 http://chariotsolutions.com/blog/post/angularjs-corner-using-promises-q-handle-asynchronous-calls/
 https://docs.angularjs.org/api/ng/service/$q
 https://github.com/kriskowal/uncommonjs/blob/master/promises/specification.md

 Depends on $rootScope
 */
var app;
(function (app) {
    var common;
    (function (common) {
        var services;
        (function (services) {
            'use strict';
            angular.module("sampleAngularApp")
                .service("dataService", app.common.services.DataService);
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
        })(services = common.services || (common.services = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
//# sourceMappingURL=dataService.js.map