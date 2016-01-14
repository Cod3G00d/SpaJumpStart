var app;
(function (app) {
    var services;
    (function (services) {
        var accounts;
        (function (accounts) {
            'use strict';
            var UserAccountService = (function () {
                function UserAccountService($q, $window, $http, constantsService, errorHandlerService, tokenHandlerService) {
                    var _this = this;
                    this.$q = $q;
                    this.$window = $window;
                    this.$http = $http;
                    this.constantsService = constantsService;
                    this.errorHandlerService = errorHandlerService;
                    this.tokenHandlerService = tokenHandlerService;
                    this.registerUser = function (registrationData) {
                        var self = _this;
                        var resource = self._serviceBase + '/api/account/register';
                        var deferred = self.$q.defer();
                        self.$http({
                            url: resource,
                            method: 'POST',
                            data: registrationData,
                        }).then(function (successResponse) {
                            deferred.resolve(successResponse);
                        }, function (errorRes) {
                            deferred.reject(errorRes);
                        });
                        return deferred.promise;
                    };
                    this.logInUser = function (loginData) {
                        var self = _this;
                        var data = "grant_type=password&username=" + loginData.Username + "&password=" + loginData.Password;
                        var tokenUrl = self._serviceBase + '/Token';
                        var deferred = self.$q.defer();
                        self.$http({
                            url: tokenUrl,
                            method: 'POST',
                            data: data,
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function (successResponse) {
                            self.tokenHandlerService.setLoginToken(successResponse.access_token);
                            self.tokenHandlerService.setLoginName(successResponse.userName);
                            deferred.resolve(successResponse);
                        }, function (errorRes) {
                            self.logOutUser();
                            deferred.reject(errorRes);
                        });
                        return deferred.promise;
                    };
                    this.logOutUser = function () {
                        var self = _this;
                        var resource = self._serviceBase + '/api/Account/Logout';
                        var deferred = self.$q.defer();
                        self.$http({
                            url: resource,
                            method: 'POST',
                        }).then(function (successResponse) {
                            self.tokenHandlerService.removeLoginToken();
                            deferred.resolve(successResponse.data);
                        }, function (errorRes) {
                            deferred.reject(errorRes);
                        });
                        return deferred.promise;
                    };
                    this.userIsAuthenticated = function () {
                        var self = _this;
                        return self.tokenHandlerService.hasLoginToken();
                    };
                    this._serviceBase = constantsService.baseUri;
                }
                UserAccountService.$inject = ['$q', '$window', '$http', 'constantsService', 'errorHandlerService', 'tokenHandlerService'];
                return UserAccountService;
            })();
            accounts.UserAccountService = UserAccountService;
            ;
        })(accounts = services.accounts || (services.accounts = {}));
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
angular.module('sampleAngularApp')
    .service('userAccountService', app.services.accounts.UserAccountService);
