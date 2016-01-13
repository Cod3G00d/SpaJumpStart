///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../factories/accounts/TokenHandlerFactory.ts" />

module app.services.routes {
    'use strict';

    export interface IRouteAuthenticationService {
        checkAuthentication(): void;
    }
}