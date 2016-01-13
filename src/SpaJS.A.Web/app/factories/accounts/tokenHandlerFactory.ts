///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../services/accounts/IStorageHandler.ts" />
///<reference path="../../services/accounts/ITokenHandlerService.ts" />

module app.factories.accounts {

    //export function TokenHandlerFactory(): app.services.accounts.TokenHandlerService {
    //    return new app.services.accounts.TokenHandlerService();
    //}

    export class TokenHandlerFactory {

        static $inject = ['storageHandler','tokenHandlerService']
        constructor(
            private storageHandler: app.services.accounts.IStorageHandler,
            private tokenHandlerService: app.services.accounts.ITokenHandlerService) {

            //return {
            //    Create: () => {
            //        return new app.services.accounts.TokenHandlerService();
            //    }
            //}
        }

        create(): app.services.accounts.ITokenHandlerService {
            return new app.services.accounts.TokenHandlerService(this.storageHandler);
        }
    }
}
angular
    .module('sampleAngularApp')
    .factory('tokenHandlerFactory', app.factories.accounts.TokenHandlerFactory);