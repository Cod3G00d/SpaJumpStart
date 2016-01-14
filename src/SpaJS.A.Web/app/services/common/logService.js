var app;
(function (app) {
    var services;
    (function (services) {
        var common;
        (function (common) {
            'use strict';
            var LogService = (function () {
                function LogService() {
                    this.log = function (message) {
                        window.console.log(message);
                    };
                }
                LogService.$inject = [];
                return LogService;
            })();
            common.LogService = LogService;
            ;
        })(common = services.common || (services.common = {}));
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
angular.module('sampleAngularApp')
    .service('logService', app.services.common.LogService);
