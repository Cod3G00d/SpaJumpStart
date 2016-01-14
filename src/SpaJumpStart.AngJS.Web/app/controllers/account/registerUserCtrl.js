var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var account;
        (function (account) {
            'use strict';
            angular.module('sampleAngularApp')
                .controller('RegisterUserCtrl', app.controllers.account.RegisterUserCtrl);
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
                    this._$scope.message = new app.domain.Message(false, "");
                    this._$scope.registrationData = new app.domain.account.RegistrationData("", "", "", "", "");
                }
                RegisterUserCtrl.prototype.register = function () {
                    var self = this;
                    var data = self._$scope.registrationData;
                    self._userAccountService.registerUser(data)
                        .then(function (response) {
                        self._$scope.savedSuccessfully = true;
                        self._$scope.message = new app.domain.Message(true, "Registered successfully, you will be redicted to login page shortly");
                        self.startTimer();
                    }, function (errorRes) {
                        var errors;
                        for (var key in errorRes.data) {
                            for (var i = 0; i < errorRes.data.modelState[key].length; i++) {
                                errors.push(errorRes.data.modelState[key][i]);
                            }
                        }
                        self._$scope.message = new app.domain.Message(false, "Failed to register user : " + errors.join(' '));
                    });
                };
                RegisterUserCtrl.prototype.startTimer = function () {
                    var self = this;
                    var timer = self.$timeout(function () {
                        self.$timeout.cancel(timer);
                        self.$location.path('/Account/Login');
                    }, 2000);
                };
                RegisterUserCtrl.$inject = ['$scope', '$location', '$timeout', , 'UserAccountService'];
                return RegisterUserCtrl;
            })();
            account.RegisterUserCtrl = RegisterUserCtrl;
        })(account = controllers.account || (controllers.account = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=registerUserCtrl.js.map