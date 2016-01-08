var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var account;
        (function (account) {
            'use strict';
            angular.module('sampleAngularApp')
                .controller('LoginCtrl', app.controllers.account.LoginCtrl);
            var LoginCtrl = (function () {
                function LoginCtrl($scope, location, userAccountService) {
                    this.$scope = $scope;
                    this.location = location;
                    this.userAccountService = userAccountService;
                    this._$scope = $scope;
                    this._userData = new app.domain.account.UserData("", "");
                }
                LoginCtrl.prototype.login = function () {
                    var self = this;
                    self._userAccountService.logInUser(self._userData)
                        .then(function (response) {
                        self._$scope.Global.isAuthenticated = true;
                        self._$location.path('/');
                    }, function (data) {
                        self._$scope.message = data.error_description;
                    });
                };
                LoginCtrl.$inject = ['$scope', '$location', 'UserAccountService'];
                return LoginCtrl;
            })();
            account.LoginCtrl = LoginCtrl;
        })(account = controllers.account || (controllers.account = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
