var UserAccountService = app.services.accounts.UserAccountService;
var loginData = app.domain.accounts.loginData;
var Message = app.domain.common.Message;
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var accounts;
        (function (accounts) {
            'use strict';
            var LoginCtrl = (function () {
                function LoginCtrl($scope, $location, userAccountService) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$location = $location;
                    this.userAccountService = userAccountService;
                    this.logIn = function () {
                        var self = _this;
                        self.userAccountService.logInUser(self.$scope.loginData)
                            .then(function (response) {
                            self.$scope.Global.userIsAuthenticated = true;
                            _this.$scope.loginData.IsUserLoggedIn = true;
                            self.$location.path('/');
                        }, function (error) {
                            if (error.data != null) {
                                var errorDescription = error.data.error_description;
                                self.$scope.message.Success = false;
                                self.$scope.message.Description = errorDescription;
                            }
                        });
                    };
                    this.$scope.loginData = new loginData("", "", false);
                    this.$scope.message = new Message(false, "");
                }
                LoginCtrl.$inject = ['$scope', '$location', 'userAccountService'];
                return LoginCtrl;
            })();
            accounts.LoginCtrl = LoginCtrl;
            angular
                .module('sampleAngularApp')
                .controller('loginCtrl', app.controllers.accounts.LoginCtrl);
        })(accounts = controllers.accounts || (controllers.accounts = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
