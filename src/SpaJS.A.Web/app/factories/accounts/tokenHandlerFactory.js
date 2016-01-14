var app;
(function (app) {
    var factories;
    (function (factories) {
        var accounts;
        (function (accounts) {
            var TokenHandlerFactory = (function () {
                function TokenHandlerFactory(storageHandler, tokenHandlerService) {
                    this.storageHandler = storageHandler;
                    this.tokenHandlerService = tokenHandlerService;
                }
                TokenHandlerFactory.prototype.create = function () {
                    return new app.services.accounts.TokenHandlerService(this.storageHandler);
                };
                TokenHandlerFactory.$inject = ['storageHandler', 'tokenHandlerService'];
                return TokenHandlerFactory;
            })();
            accounts.TokenHandlerFactory = TokenHandlerFactory;
        })(accounts = factories.accounts || (factories.accounts = {}));
    })(factories = app.factories || (app.factories = {}));
})(app || (app = {}));
angular
    .module('sampleAngularApp')
    .factory('tokenHandlerFactory', app.factories.accounts.TokenHandlerFactory);
