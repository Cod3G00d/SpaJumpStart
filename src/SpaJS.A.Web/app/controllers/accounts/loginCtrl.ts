///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../services/accounts/IuserAccountService.ts" />
///<reference path="../../domain/accounts/ILoginData.ts" />
///<reference path="../../domain/accounts/loginData.ts" />

module app.controllers.accounts {
    'use strict';

    export interface ILoginCtrlScope extends ng.IScope {
        message: string;
    }

    export class LoginCtrl {
        private _$scope: ILoginCtrlScope;
        private _$location: ng.ILocationService;
        private _userAccountService: app.services.accounts.IUserAccountService;
        private _loginData: app.domain.accounts.ILoginData;

        static $inject = ['$scope', '$location', 'UserAccountService'];

        constructor(
            public $scope: any,
            private $location: ng.ILocationService,
            private userAccountService: app.services.accounts.IUserAccountService)
        {
            this._$scope = <any> $scope;
            this._loginData = new app.domain.accounts.loginData("","");
        }

        login(): void {
            var self = this;

            self._userAccountService.logInUser(self._loginData)
                .then((response) => {
                    self.$scope.Global.userIsAuthenticated = true;
                    self._$location.path('/');
                }, (data) => {
                    self._$scope.message = data.error_description;
                });
        }
    }
    angular.module('sampleAngularApp')
        .controller('loginCtrl', app.controllers.accounts.LoginCtrl);
}