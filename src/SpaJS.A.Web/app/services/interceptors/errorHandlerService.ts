///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="IErrorHandlerService.ts" />

module app.services.interceptors {

    export class ErrorHandlerService implements app.services.interceptors.IErrorHandlerService {

        static $inject = ['logService'];

        constructor(private logService: app.services.common.ILogService) {}

        logError(status: string, message: string, rejection?: any): void {
            if (angular.isUndefined(rejection)) {
                this.logService.log(status + ': ' + message);
            } else {
                this.logService.log(status + ': ' + message + ' : ' + JSON.stringify(rejection));
            }
        }

        logServiceError(controllerName: string, reason: string): void {
            this.logService.log(controllerName + ': Unhandled error : ' + JSON.stringify(reason));
        }

        logServiceNotify(controllerName: string, update: any): void {
            this.logService.log(controllerName + ': Notification received : ' + JSON.stringify(update));
        }
    }
}
//register the service module with angularjs
angular.module('sampleAngularApp')
    .service('errorHandlerService', app.services.interceptors.ErrorHandlerService);

