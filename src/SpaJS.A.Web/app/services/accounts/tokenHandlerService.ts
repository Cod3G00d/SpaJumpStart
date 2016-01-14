///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="storageHandler.ts" />
///<reference path="ITokenHandlerService.ts" />

module app.services.accounts {

    export class TokenHandlerService implements app.services.accounts.ITokenHandlerService{
        private _loginTokenId:string = 'spa-app-loginToken-2016';
        private _nameTokenId:string = 'spa-app-loginName-2016';
        private _redirectUrl:string = null;

        static $inject = ['storageHandler'];

        constructor(
            private storageHandler: app.services.accounts.IStorageHandler ) { }

        setLoginToken(token): void {
            this.storageHandler.setItem(this._loginTokenId, token);
        }
        getLoginToken(): any  {
            return this.storageHandler.getItem(this._loginTokenId);

        }
        removeLoginToken(): void {
            this.storageHandler.removeItem(this._loginTokenId);
        }
        hasLoginToken(): boolean {
            return this.getLoginToken() != null;
        }
        setRedirectUrl(url): void {
            this._redirectUrl = url;
        }
        getRedirectUrl(): string {
            return this._redirectUrl;
        }
        setLoginName(name): void {
            this.storageHandler.setItem(this._nameTokenId, name);
        }
        getLoginName (): string {
            return this.storageHandler.getItem(this._nameTokenId);
        }
    }
}
angular
    .module('sampleAngularApp')
    .service('tokenHandlerService', app.services.accounts.TokenHandlerService);