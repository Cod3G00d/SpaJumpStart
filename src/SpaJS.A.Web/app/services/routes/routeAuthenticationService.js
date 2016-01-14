var app;
(function (app) {
    var services;
    (function (services) {
        var routes;
        (function (routes) {
            'use strict';
            var RouteAuthenticationService = (function () {
                function RouteAuthenticationService($rootScope, $location, tokenHandlerFactory) {
                    this.$rootScope = $rootScope;
                    this.$location = $location;
                    this.tokenHandlerFactory = tokenHandlerFactory;
                    this._tokenHandlerService = tokenHandlerFactory.create();
                }
                RouteAuthenticationService.prototype.checkAuthentication = function () {
                    this.$rootScope.$on('$routeChangeStart', function (event, next, current) {
                        var requiresLogin = next.requiresLogin || false;
                        if (requiresLogin) {
                            var loggedIn = this._tokenHandlerService.hasLoginToken();
                            if (!loggedIn) {
                                this.$location.path('/Account/Login');
                            }
                        }
                    });
                };
                RouteAuthenticationService.sinject = ['$rootScope', '$location', 'tokenHandlerFactory'];
                return RouteAuthenticationService;
            })();
            routes.RouteAuthenticationService = RouteAuthenticationService;
        })(routes = services.routes || (services.routes = {}));
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
