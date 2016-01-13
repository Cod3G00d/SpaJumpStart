module app.services.interceptors {
    'use strict';

    export interface IXmlHttpInterceptorService {
        request(config: any): ng.IPromise<any>;
        requestError(rejection: any): ng.IPromise<any>;
        response(response): ng.IPromise<any>;
        responseError(rejection): ng.IPromise<any>
    }
}