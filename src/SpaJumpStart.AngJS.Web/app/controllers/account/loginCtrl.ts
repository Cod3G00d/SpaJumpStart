//$scope.loginData = {
//    userName: "",
//    password: ""
//};


module app.controllers.account {
    'use strict';

    angular.module('sampleAngularApp')
        .controller('LoginCtrl', app.controllers.account.LoginCtrl);

    export class LoginCtrl {

        static $inject = ['$scope', '$location', 'AuthService'];

        constructor(
            public $scope: any,
            private location: ng.ILocationService,
            private authService: app.common.services.AuthService)
        {

        }

        //$scope.message = "";

        //$scope.login = function () {

        //    AuthService.login($scope.loginData).then(
        //        function (response) {
        //            $scope.Global.isAuthenticated = true;
        //            $location.path('/');
        //        },
        //        function (data) {
        //            $scope.message = data.error_description;
        //        });
        //};
    }
}