///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../common/IConstantsService.ts" />
///<reference path="../common/constantsService.ts" />
///<reference path="../../domain/accounts/IRegistrationData.ts" />
///<reference path="../../domain/accounts/ILoginData.ts" />
///<reference path="IUserAccountService.ts" />
var app;
(function (app) {
    var services;
    (function (services) {
        var accounts;
        (function (accounts) {
            'use strict';
            var UserAccountService = (function () {
                function UserAccountService($q, $window, $http, constantsService, errorHandler, tokenHandler) {
                    this._$http = $http;
                    this._$q = $q;
                    //this._constantsService = constantsService;
                    this._errorHandler = errorHandler;
                    this._tokenHandler = tokenHandler;
                    this._url = constantsService.baseUri + constantsService.postUri;
                }
                //register(T): ng.IPromise<T> {
                UserAccountService.prototype.registerUser = function (registrationData) {
                    var self = this;
                    var deferred = self._$q.defer();
                    self._$http({
                        url: self._url,
                        method: 'POST',
                        data: registrationData,
                    }).then(function (successResponse) {
                        deferred.resolve(successResponse);
                    }, function (errorRes) {
                        deferred.reject(errorRes);
                    });
                    return deferred.promise;
                };
                //logInUser(T): ng.IPromise<T> {
                UserAccountService.prototype.logInUser = function (loginData) {
                    var self = this;
                    var deferred = self._$q.defer();
                    var data = "username=" + loginData.Username + "&password=" + loginData.Password + "&grant_type=password";
                    var tokenUrl = self._url + 'token';
                    self._$http({
                        url: tokenUrl,
                        method: 'POST',
                        data: data,
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function (successResponse) {
                        self._tokenHandler.setLoginToken(successResponse.access_token);
                        self._tokenHandler.setLoginName(successResponse.userName);
                        deferred.resolve(successResponse);
                    }, function (errorRes) {
                        self.logOutUser();
                        deferred.reject(errorRes);
                    });
                    return deferred.promise;
                };
                //logOutUser(T): ng.IPromise<T> {
                UserAccountService.prototype.logOutUser = function () {
                    var self = this;
                    var resource = self._url;
                    var deferred = self._$q.defer();
                    self._$http({
                        url: resource,
                        method: 'POST',
                    }).then(function (successResponse) {
                        self._tokenHandler.removeLoginToken();
                        deferred.resolve(successResponse.data);
                    }, function (errorRes) {
                        self.logOutUser();
                        deferred.reject(errorRes);
                    });
                    return deferred.promise;
                };
                UserAccountService.prototype.userIsAuthenticated = function () {
                    var self = this;
                    return self._tokenHandler.hasLoginToken();
                };
                UserAccountService.$inject = ['$q', '$window', '$http', 'constantsService', 'errorHandler', 'tokenHandler'];
                return UserAccountService;
            })();
            accounts.UserAccountService = UserAccountService;
            ;
            angular.module('sampleAngularApp')
                .controller('userAccountService', app.services.accounts.UserAccountService);
        })(accounts = services.accounts || (services.accounts = {}));
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=userAccountService.js.map