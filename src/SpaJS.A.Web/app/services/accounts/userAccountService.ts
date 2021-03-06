///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../common/IConstantsService.ts" />
///<reference path="../common/constantsService.ts" />
///<reference path="../../domain/accounts/IRegistrationData.ts" />
///<reference path="../../domain/accounts/ILoginData.ts" />

///<reference path="IUserAccountService.ts" />

import IConstantsService = app.services.common.IConstantsService;

module app.services.accounts {
    'use strict';
    
    export class UserAccountService implements app.services.accounts.IUserAccountService {
        //Relative Typescript definitions (ng.IHttpService and ng.IQService)

        private _serviceBase: string;

        static $inject = ['$q', '$window', '$http', 'constantsService', 'errorHandlerService', 'tokenHandlerService'];

        constructor(
            private $q: ng.IQService,
            private $window: ng.IWindowService,
            private $http: ng.IHttpService,
            private constantsService: IConstantsService,
            private errorHandlerService: app.services.interceptors.IErrorHandlerService,
            private tokenHandlerService: app.services.accounts.ITokenHandlerService) {

            this._serviceBase =  constantsService.baseUri;
        }

        //register(T): ng.IPromise<T> {
        registerUser = (registrationData: app.domain.accounts.IRegistrationData): ng.IPromise<any> => {
            var self = this;

            var resource = self._serviceBase + '/api/account/register';
            var deferred = self.$q.defer();

            self.$http({
                url: resource,
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
        logInUser = (loginData: app.domain.accounts.ILoginData): ng.IPromise<any> => {
            var self = this; 

            var data = "grant_type=password&username=" + loginData.Username + "&password=" + loginData.Password;

            //if (loginData.useRefreshTokens) {
            //    data = data + "&client_id=" + ngAuthSettings.clientId;
            //}

            var tokenUrl = self._serviceBase + '/Token';

            //alert('Token: ' + tokenUrl);
            var deferred = self.$q.defer();
            
            self.$http({
                url: tokenUrl,
                method: 'POST',
                data: data,
                withCredentials: true,
                headers: {
                    //'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((successResponse: any) => {

                if (successResponse.data != null) {
                    var token = successResponse.data.access_token;
                    var username = successResponse.data.userName;
                    var tokenType = successResponse.data.token_type; 
                }

                //alert('success: username: ' + username + ' token: ' + token + 'token type:' + tokenType);

                self.tokenHandlerService.setLoginToken(token);
                self.tokenHandlerService.setLoginName(username);

                deferred.resolve(successResponse);

            }, (errorRes) => {
                self.logOutUser();
                deferred.reject(errorRes);
            });
            return deferred.promise;
        } 

        //logOutUser(T): ng.IPromise<T> {
        logOutUser = (): ng.IPromise<any> => {
            var self = this;

            var resource = self._serviceBase + '/api/Account/Logout';

            var deferred = self.$q.defer();

            self.$http({
                url: resource,
                method: 'POST',
            }).then((successResponse) => {
                self.tokenHandlerService.removeLoginToken();
                deferred.resolve(successResponse.data);
            }, (errorRes) => {
                //self.logOutUser(); otherwise endless loop
                deferred.reject(errorRes);
            });
            return deferred.promise;
        }

        userIsAuthenticated =(): boolean => {
            var self = this;
            return self.tokenHandlerService.hasLoginToken();
        }
    };
}
angular
    .module('sampleAngularApp')
    .service('userAccountService', app.services.accounts.UserAccountService);
