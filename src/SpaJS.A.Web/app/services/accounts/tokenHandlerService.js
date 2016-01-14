var app;
(function (app) {
    var services;
    (function (services) {
        var accounts;
        (function (accounts) {
            var TokenHandlerService = (function () {
                function TokenHandlerService(storageHandler) {
                    this.storageHandler = storageHandler;
                    this._loginTokenId = 'spa-app-loginToken-2016';
                    this._nameTokenId = 'spa-app-loginName-2016';
                    this._redirectUrl = null;
                }
                TokenHandlerService.prototype.setLoginToken = function (token) {
                    this.storageHandler.setItem(this._loginTokenId, token);
                };
                TokenHandlerService.prototype.getLoginToken = function () {
                    return this.storageHandler.getItem(this._loginTokenId);
                };
                TokenHandlerService.prototype.removeLoginToken = function () {
                    this.storageHandler.removeItem(this._loginTokenId);
                };
                TokenHandlerService.prototype.hasLoginToken = function () {
                    return this.getLoginToken() != null;
                };
                TokenHandlerService.prototype.setRedirectUrl = function (url) {
                    this._redirectUrl = url;
                };
                TokenHandlerService.prototype.getRedirectUrl = function () {
                    return this._redirectUrl;
                };
                TokenHandlerService.prototype.setLoginName = function (name) {
                    this.storageHandler.setItem(this._nameTokenId, name);
                };
                TokenHandlerService.prototype.getLoginName = function () {
                    return this.storageHandler.getItem(this._nameTokenId);
                };
                TokenHandlerService.$inject = ['storageHandler'];
                return TokenHandlerService;
            })();
            accounts.TokenHandlerService = TokenHandlerService;
        })(accounts = services.accounts || (services.accounts = {}));
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
angular
    .module('sampleAngularApp')
    .service('tokenHandlerService', app.services.accounts.TokenHandlerService);
