///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../common/IConstantsService.ts" />
///<reference path="../common/constantsService.ts" />
///<reference path="../../domain/accounts/IRegistrationData.ts" />
///<reference path="../../domain/accounts/ILoginData.ts" />

///<reference path="IUserAccountService.ts" />

module app.services.accounts {
    'use strict';
    
    export class UserAccountService implements app.services.accounts.IUserAccountService {
        //Relative Typescript definitions (ng.IHttpService and ng.IQService)

        private _$http: ng.IHttpService;
        private _$q: ng.IQService;
        private _errorHandler: any;
        //private _constantsService: app.common.services.ConstantsService;
        private _tokenHandler: any;

        private _url: string;

        static $inject = ['$q', '$window', '$http', 'constantsService', 'errorHandler', 'tokenHandler'];

        constructor(
            $q: ng.IQService,
            $window: ng.IWindowService,
            $http: ng.IHttpService,
            constantsService: app.services.common.IConstantsService,
            errorHandler: any,
            tokenHandler: any
        ) {
            this._$http = $http;
            this._$q = $q;
            //this._constantsService = constantsService;
            this._errorHandler = errorHandler;
            this._tokenHandler = tokenHandler;
            this._url =  constantsService.baseUri + constantsService.postUri;
        }

        //register(T): ng.IPromise<T> {
        registerUser(registrationData: app.domain.accounts.IRegistrationData): ng.IPromise<any> {
            var self = this;

            var deferred = self._$q.defer();

            self._$http({
                url: self._url,
                method: 'POST',
                data: registrationData,
            }).then((successResponse) => {
                deferred.resolve(successResponse);
            }, (errorRes) => {
                deferred.reject(errorRes);
            });
            return deferred.promise;
        }

        //logInUser(T): ng.IPromise<T> {
        logInUser(loginData: app.domain.accounts.ILoginData): ng.IPromise<any> {
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
            }).then((successResponse: any) => {
                self._tokenHandler.setLoginToken(successResponse.access_token);
                self._tokenHandler.setLoginName(successResponse.userName);
                deferred.resolve(successResponse);
            }, (errorRes) => {
                self.logOutUser();
                deferred.reject(errorRes);
            });
            return deferred.promise;
        } 

        //logOutUser(T): ng.IPromise<T> {
        logOutUser(): ng.IPromise<any> {
            var self = this;
            var resource = self._url;

            var deferred = self._$q.defer();

            self._$http({
                url: resource,
                method: 'POST',
            }).then((successResponse) => {
                self._tokenHandler.removeLoginToken();
                deferred.resolve(successResponse.data);
            }, (errorRes) => {
                self.logOutUser();
                deferred.reject(errorRes);
            });
            return deferred.promise;
        }

        userIsAuthenticated(): boolean {
            var self = this;
            return self._tokenHandler.hasLoginToken();
        }
    };
    angular.module('sampleAngularApp')
        .controller('userAccountService', app.services.accounts.UserAccountService);

}

