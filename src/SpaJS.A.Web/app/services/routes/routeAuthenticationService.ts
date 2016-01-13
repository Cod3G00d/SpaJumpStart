///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../factories/accounts/TokenHandlerFactory.ts" />
///<reference path="IRouteAuthenticationService.ts" />

module app.services.routes {
    'use strict';

    export class RouteAuthenticationService implements app.services.routes.IRouteAuthenticationService {

        private _tokenHandlerService;

        static sinject = ['$rootScope', '$location', 'tokenHandlerFactory'];

        constructor(
            private $rootScope: ng.IRootScopeService,
            private $location: ng.ILocationService,
            private tokenHandlerFactory: app.factories.accounts.TokenHandlerFactory) {

            this._tokenHandlerService = tokenHandlerFactory.create();
        }

        checkAuthentication(): void {

            this.$rootScope.$on('$routeChangeStart', function (event, next, current) {
                var requiresLogin = next.requiresLogin || false;
                if (requiresLogin) {

                    var loggedIn = this._tokenHandlerService.hasLoginToken();

                    if (!loggedIn) {
                        this.$location.path('/Account/Login');
                    }
                }
            });
        }
    }
}
//angular
//    .module('sampleAngularApp')
//    .service('routeAuthenticationService', app.services.routes.RouteAuthenticationService);