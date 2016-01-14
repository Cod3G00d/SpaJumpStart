var app;
(function (app) {
    var services;
    (function (services) {
        var accounts;
        (function (accounts) {
            var TokenHandlerService = (function () {
                function TokenHandlerService() {
                }
                TokenHandlerService.prototype.Create = function () {
                };
                TokenHandlerService.$inject = ['storageHandler'];
                return TokenHandlerService;
            })();
            accounts.TokenHandlerService = TokenHandlerService;
        })(accounts = services.accounts || (services.accounts = {}));
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
