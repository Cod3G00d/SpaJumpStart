var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var accounts;
        (function (accounts) {
            'use strict';
            var loginData = app.domain.accounts.loginData;
            var LoginCtrl = (function () {
                function LoginCtrl($scope, $location, userAccountService) {
                    this.$scope = $scope;
                    this.$location = $location;
                    this.userAccountService = userAccountService;
                    this.$scope = $scope;
                    this._loginData = new loginData("", "");
                }
                LoginCtrl.prototype.login = function () {
                    var self = this;
                    self._userAccountService.logInUser(self._loginData)
                        .then(function (response) {
                        self.$scope.Global.userIsAuthenticated = true;
                        self.$location.path('/');
                    }, function (data) {
                        self.$scope.message = data.error_description;
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
