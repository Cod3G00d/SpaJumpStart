var app;
(function (app) {
    var services;
    (function (services) {
        var interceptors;
        (function (interceptors) {
            'use strict';
            var XmlHttpInterceptorService = (function () {
                function XmlHttpInterceptorService($rootScope, $q, tokenHandlerService, errorHandlerService) {
                    var _this = this;
                    this.$rootScope = $rootScope;
                    this.$q = $q;
                    this.tokenHandlerService = tokenHandlerService;
                    this.errorHandlerService = errorHandlerService;
                    this._self = this;
                    this.request = function (config) {
                        var self = _this;
                        config.headers = config.headers || {};
                        var localToken;
                        if (self.tokenHandlerService.hasLoginToken()) {
                            localToken = self.tokenHandlerService.getLoginToken();
                            if (localToken) {
                                config.headers.Authorization = 'Bearer ' + localToken;
                            }
                        }
                        return config;
                    };
                    this.requestError = function (rejection) {
                        var self = _this;
                        var status = rejection.status;
                        if (status === 401) {
                            self.errorHandlerService.logError(status, 'Not authorized.', rejection);
                        }
                        else {
                            self.errorHandlerService.logError(status, 'Unhandled error.', rejection);
                        }
                        ;
                        return self.$q.reject(rejection);
                    };
                    this.response = function (response) {
                        var self = _this;
                        var status = response.status;
                        if (status === 401) {
                            self.errorHandlerService.logError(status, 'Not authorized.');
                        }
                        ;
                        return response || self.$q.when(response);
                    };
                    this.responseError = function (rejection) {
                        var self = _this;
                        var status = rejection.status;
                        if (status === 401) {
                            self.errorHandlerService.logError(status, 'Not authorized.', rejection);
                        }
                        else {
                            self.errorHandlerService.logError(status, 'Unhandled error.', rejection);
                        }
                        ;
                        return self.$q.reject(rejection);
                    };
                }
                XmlHttpInterceptorService.$inject = ['$rootScope', '$q', 'tokenHandlerService', 'errorHandlerService'];
                return XmlHttpInterceptorService;
            })();
            interceptors.XmlHttpInterceptorService = XmlHttpInterceptorService;
        })(interceptors = services.interceptors || (services.interceptors = {}));
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
angular.module('sampleAngularApp')
    .service('xmlHttpInterceptorService', app.services.interceptors.XmlHttpInterceptorService);
