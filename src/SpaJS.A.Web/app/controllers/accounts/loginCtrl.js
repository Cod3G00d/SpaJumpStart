///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../services/accounts/IuserAccountService.ts" />
///<reference path="../../domain/accounts/ILoginData.ts" />
///<reference path="../../domain/accounts/loginData.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var accounts;
        (function (accounts) {
            'use strict';
            var LoginCtrl = (function () {
                function LoginCtrl($scope, $location, userAccountService) {
                    this.$scope = $scope;
                    this.$location = $location;
                    this.userAccountService = userAccountService;
                    this._$scope = $scope;
                    this._loginData = new app.domain.accounts.loginData("", "");
                }
                LoginCtrl.prototype.login = function () {
                    var self = this;
                    self._userAccountService.logInUser(self._loginData)
                        .then(function (response) {
                        self.$scope.Global.userIsAuthenticated = true;
                        self._$location.path('/');
                    }, function (data) {
                        self._$scope.message = data.error_description;
                    });
                };
                LoginCtrl.$inject = ['$scope', '$location', 'UserAccountService'];
                return LoginCtrl;
            })();
            accounts.LoginCtrl = LoginCtrl;
            angular.module('sampleAngularApp')
                .controller('loginCtrl', app.controllers.accounts.LoginCtrl);
        })(accounts = controllers.accounts || (controllers.accounts = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=loginCtrl.js.map