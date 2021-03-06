var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var accounts;
        (function (accounts) {
            'use strict';
            var Message = app.domain.common.Message;
            var registrationData = app.domain.accounts.registrationData;
            var RegisterUserCtrl = (function () {
                function RegisterUserCtrl($scope, $location, $timeout, userAccountService) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$location = $location;
                    this.$timeout = $timeout;
                    this.userAccountService = userAccountService;
                    this._getUserData = function () {
                        var self = _this;
                        var userData = self.$scope.registrationData;
                        userData.ConfirmPassword = userData.Password;
                        if (userData.UserName == "" && userData.Email != "") {
                            userData.UserName = userData.Email;
                        }
                        return userData;
                    };
                    this.register = function () {
                        var self = _this;
                        var data = _this._getUserData();
                        self.userAccountService.registerUser(data)
                            .then(function (response) {
                            self.$scope.savedSuccessfully = true;
                            self.$scope.message = new Message(true, "Registered successfully, you will be redicted to login page shortly");
                            self.startTimer();
                        }, function (errorRes) {
                            var errors;
                            for (var key in errorRes.data) {
                                for (var i = 0; i < errorRes.data.modelState[key].length; i++) {
                                    errors.push(errorRes.data.modelState[key][i]);
                                }
                            }
                            self.$scope.message = new Message(false, "Failed to register user : ");
                        });
                    };
                    this.startTimer = function () {
                        var self = _this;
                        var timer = self.$timeout(function () {
                            self.$timeout.cancel(timer);
                            self.$location.path('/Account/Login');
                        }, 2000);
                    };
                    this.$scope.savedSuccessfully = false;
                    this.$scope.message = new Message(false, "");
                    this.$scope.registrationData = new registrationData("", "", "", "", "", "");
                }
                RegisterUserCtrl.$inject = ['$scope', '$location', '$timeout', 'userAccountService'];
                return RegisterUserCtrl;
            })();
            accounts.RegisterUserCtrl = RegisterUserCtrl;
            angular.module('sampleAngularApp')
                .controller('registerUserCtrl', app.controllers.accounts.RegisterUserCtrl);
        })(accounts = controllers.accounts || (controllers.accounts = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
