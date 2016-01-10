///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../services/accounts/IuserAccountService.ts" />
///<reference path="../../domain/accounts/ILoginData.ts" />
///<reference path="../../domain/accounts/loginData.ts" />

module app.controllers.accounts {
    'use strict';

    import IUserAccountService = app.services.accounts.IUserAccountService;
    import ILoginData = app.domain.accounts.ILoginData;
    import loginData = app.domain.accounts.loginData;

    export interface ILoginCtrlScope extends ng.IScope {
        message: string;
    }

    export class LoginCtrl {
        //Dont need these as declared private and useable - it's overkill and redundant code
        //private _$scope: ILoginCtrlScope;
        //private _$location: ng.ILocationService;
        private _userAccountService: IUserAccountService;
        private _loginData: ILoginData;

        static $inject = ['$scope', '$location', 'UserAccountService'];

        constructor(
            private $scope: any,
            private $location: ng.ILocationService,
            private userAccountService: IUserAccountService)
        {
            this.$scope = <any> $scope;
            this._loginData = new loginData("","");
        }

        login(): void {
            var self = this;

            self._userAccountService.logInUser(self._loginData)
                .then((response) => {
                    self.$scope.Global.userIsAuthenticated = true;
                    self.$location.path('/');
                }, (data) => {
                    self.$scope.message = data.error_description;
                });
        }
    }
    angular.module('sampleAngularApp')
        .controller('loginCtrl', app.controllers.accounts.LoginCtrl);
}