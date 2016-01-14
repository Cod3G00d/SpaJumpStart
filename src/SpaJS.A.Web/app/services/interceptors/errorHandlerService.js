var app;
(function (app) {
    var services;
    (function (services) {
        var interceptors;
        (function (interceptors) {
            var ErrorHandlerService = (function () {
                function ErrorHandlerService(logService) {
                    this.logService = logService;
                }
                ErrorHandlerService.prototype.logError = function (status, message, rejection) {
                    if (angular.isUndefined(rejection)) {
                        this.logService.log(status + ': ' + message);
                    }
                    else {
                        this.logService.log(status + ': ' + message + ' : ' + JSON.stringify(rejection));
                    }
                };
                ErrorHandlerService.prototype.logServiceError = function (controllerName, reason) {
                    this.logService.log(controllerName + ': Unhandled error : ' + JSON.stringify(reason));
                };
                ErrorHandlerService.prototype.logServiceNotify = function (controllerName, update) {
                    this.logService.log(controllerName + ': Notification received : ' + JSON.stringify(update));
                };
                ErrorHandlerService.$inject = ['logService'];
                return ErrorHandlerService;
            })();
            interceptors.ErrorHandlerService = ErrorHandlerService;
        })(interceptors = services.interceptors || (services.interceptors = {}));
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
angular.module('sampleAngularApp')
    .service('errorHandlerService', app.services.interceptors.ErrorHandlerService);
