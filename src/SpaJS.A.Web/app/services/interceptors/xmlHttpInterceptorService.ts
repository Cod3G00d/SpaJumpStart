///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="IXmlHttpInterceptorService.ts" />
///<reference path="IErrorHandlerService.ts" />
///<reference path="errorHandlerService.ts" />

module app.services.interceptors {
    'use strict';

    export class XmlHttpInterceptorService implements app.services.interceptors.IXmlHttpInterceptorService
    {
        //static $inject = ['$rootScope', '$q', '$window', 'tokenHandlerService', 'errorHandlerService'];
        static $inject = ['$rootScope', '$q', 'tokenHandlerService', 'errorHandlerService'];

        private _self = this;

        constructor(
            private $rootScope: ng.IRootScopeService,
            private $q: ng.IQService,
            //private $window: ng.IWindowService,
            private tokenHandlerService: app.services.accounts.ITokenHandlerService,
            private errorHandlerService: app.services.interceptors.IErrorHandlerService) { }

        request = (config: any): ng.IPromise<any> => {
            var self = this;

            config.headers = config.headers || {};
            // if we have a token stored, append it to the headers as an Authorization bearer header
            var localToken; //= this.$window.localStorage.key("");

            if (self.tokenHandlerService.hasLoginToken()) {
                localToken = self.tokenHandlerService.getLoginToken();
                config.headers.Authorization = 'Bearer ' + localToken;
            }

            //if (localToken) {
            //    config.headers.Authorization = 'Bearer ' + localToken;
            //}
            return config;
        }

        requestError = (rejection: any): ng.IPromise<any> => {
            var self = this;

            var status = rejection.status;

            if (status === 401) {
                self.errorHandlerService.logError(status, 'Not authorized.', rejection);
            } else {
                self.errorHandlerService.logError(status, 'Unhandled error.', rejection);
            };

            return self.$q.reject(rejection);
        }

        response = (response): ng.IPromise<any> => {
            var self = this;

            var status = response.status;

            if (status === 401) {
                self.errorHandlerService.logError(status, 'Not authorized.');
            };
            return response || self.$q.when(response);
        }
     
        responseError = (rejection): ng.IPromise<any> => {
            var self = this;
            var status = rejection.status;

            if (status === 401) {
                self.errorHandlerService.logError(status, 'Not authorized.', rejection);
            } else {
                self.errorHandlerService.logError(status, 'Unhandled error.', rejection);
            };

            return self.$q.reject(rejection);
        }
    }
}
//register the service module with angularjs
angular.module('sampleAngularApp')
    .service('xmlHttpInterceptorService', app.services.interceptors.XmlHttpInterceptorService);
