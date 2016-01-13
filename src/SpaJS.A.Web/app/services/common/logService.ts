module app.services.common {
    'use strict';

    export interface ILogService {
        log(message: string): void;
    }

    export class LogService implements app.services.common.ILogService {

        //static $inject = ['$rootScope'];
        //constructor($rootScope: ng.IRootScopeService) {

        //}

        static $inject = [];
        constructor() { }

        log = (message: string) => {
            window.console.log(message);
            //window.console && console.error(message);
        }

    };
}

//register the service module with angularjs
angular.module('sampleAngularApp')
    .service('logService', app.services.common.LogService);

//angular.module("sampleAngularApp", [])
//    .service("logService", [

//    "$rootScope", ($rootScope: ng.IRootScopeService): () => new LogService($rootScope)
 
//]);