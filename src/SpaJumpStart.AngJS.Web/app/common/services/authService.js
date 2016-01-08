var app;
(function (app) {
    var common;
    (function (common) {
        var services;
        (function (services) {
            'use strict';
            angular.module('sampleAngularApp')
                .controller('AuthService', app.common.services.AuthService);
            var AuthService = (function () {
                function AuthService($q, $window, errorHandler, $http, tokenHandler) {
                    this.httpService = $http;
                    this.qService = $q;
                }
                AuthService.prototype.saveRegistration = function (resource, registration) {
                    var self = this;
                    var deferred = self.qService.defer();
                    self.httpService.post(resource, registration).then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                AuthService.$inject = ['$q', '$window', 'errorHandler', '$http', 'tokenHandler'];
                return AuthService;
            })();
            services.AuthService = AuthService;
        })(services = common.services || (common.services = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
