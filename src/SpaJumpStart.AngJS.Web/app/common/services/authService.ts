module app.common.services {
    'use strict';

    angular.module('sampleAngularApp')
        .controller('AuthService', app.common.services.AuthService);

    export class AuthService {
        //Relative Typescript definitions (ng.IHttpService and ng.IQService)

        private httpService: ng.IHttpService;
        private qService: ng.IQService;
        private errorHanlder: string;

        static $inject['$q', '$window', 'errorHandler', '$http', 'tokenHandler'];
        constructor(
            $q: ng.IQService,
            $window: ng.IWindowService,
            errorHandler: string,
            $http: ng.IHttpService,
            tokenHandler: string
        ) {
            this.httpService = $http;
            this.qService = $q;
        }

        saveRegistration(resource: string, registration: any) {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.post(resource, registration).then(
                function (response) {
                    deferred.resolve(response);
                },
                function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }


}

