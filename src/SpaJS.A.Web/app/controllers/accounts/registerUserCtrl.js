///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../services/accounts/IUserAccountService.ts" />
///<reference path="../../domain/accounts/IRegistrationData.ts" />
///<reference path="../../domain/accounts/RegistrationData.ts" />
///<reference path="../../domain/common/IMessage.ts" />
///<reference path="../../domain/common/Message.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var accounts;
        (function (accounts) {
            'use strict';
            var RegisterUserCtrl = (function () {
                function RegisterUserCtrl($scope, $location, $timeout, userAccountService) {
                    this.$scope = $scope;
                    this.$location = $location;
                    this.$timeout = $timeout;
                    this.userAccountService = userAccountService;
                    this._$scope = $scope;
                    this._$location = $location;
                    this._userAccountService = userAccountService;
                    //this._$timeout = $timeout;
                    this._$scope.savedSuccessfully = false;
                    this._$scope.message = new app.domain.common.Message(false, "");
                    this._$scope.registrationData = new app.domain.accounts.registrationData("", "", "", "", "");
                }
                RegisterUserCtrl.prototype.register = function () {
                    var self = this;
                    var data = self._$scope.registrationData;
                    self._userAccountService.registerUser(data)
                        .then(function (response) {
                        self._$scope.savedSuccessfully = true;
                        self._$scope.message = new app.domain.common.Message(true, "Registered successfully, you will be redicted to login page shortly");
                        self.startTimer();
                    }, function (errorRes) {
                        var errors;
                        for (var key in errorRes.data) {
                            for (var i = 0; i < errorRes.data.modelState[key].length; i++) {
                                errors.push(errorRes.data.modelState[key][i]);
                            }
                        }
                        self._$scope.message = new app.domain.common.Message(false, "Failed to register user : " + errors.join(' '));
                    });
                };
                RegisterUserCtrl.prototype.startTimer = function () {
                    var self = this;
                    var timer = self.$timeout(function () {
                        self.$timeout.cancel(timer);
                        self.$location.path('/Account/Login');
                    }, 2000);
                };
                RegisterUserCtrl.$inject = ['$scope', '$location', '$timeout', 'UserAccountService'];
                return RegisterUserCtrl;
            })();
            accounts.RegisterUserCtrl = RegisterUserCtrl;
            angular.module('sampleAngularApp')
                .controller('registerUserCtrl', app.controllers.accounts.RegisterUserCtrl);
        })(accounts = controllers.accounts || (controllers.accounts = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=registerUserCtrl.js.map