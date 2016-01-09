module app.common.services {
    'use strict';
    
    angular.module('sampleAngularApp')
        .controller('AuthService', app.common.services.UserAccountService);

    export interface IUserAccountService {
        registerUser(registration: app.domain.account.IRegistrationData): ng.IPromise<any>;
        logInUser(userData: app.domain.account.IUserData): ng.IPromise<any>;
        logOutUser(): ng.IPromise<any>;
        userIsAuthenticated(): boolean;
    }

    export class UserAccountService implements IUserAccountService {
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
            constantsService: app.common.services.ConstantsService,
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
        registerUser(registration: app.domain.account.IRegistrationData): ng.IPromise<any> {
            var self = this;

            var deferred = self._$q.defer();

            self._$http({
                url: self._url,
                method: 'POST',
                data: registration
            }).then((successResponse) => {
                deferred.resolve(successResponse);
            }, (errorRes) => {
                deferred.reject(errorRes);
            });
            return deferred.promise;
        }

        //logInUser(T): ng.IPromise<T> {
        logInUser(userData: app.domain.account.IUserData): ng.IPromise<any> {
            var self = this; 

            var deferred = self._$q.defer();
            var data = "username=" + userData.Username + "&password=" + userData.Password + "&grant_type=password";
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
}

