//$scope.loginData = {
//    userName: "",
//    password: ""
//};
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
                function LoginCtrl($scope, location, authService) {
                    this.$scope = $scope;
                    this.location = location;
                    this.authService = authService;
                }
                LoginCtrl.$inject = ['$scope', '$location', 'AuthService'];
                return LoginCtrl;
            })();
            account.LoginCtrl = LoginCtrl;
        })(account = controllers.account || (controllers.account = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
