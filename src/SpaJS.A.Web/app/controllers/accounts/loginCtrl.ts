///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../services/accounts/IuserAccountService.ts" />
///<reference path="../../domain/accounts/ILoginData.ts" />
///<reference path="../../domain/accounts/loginData.ts" />
///<reference path="../../domain/common/IMessage.ts" />
///<reference path="../../domain/common/Message.ts" />

import IUserAccountService = app.services.accounts.IUserAccountService;
import UserAccountService = app.services.accounts.UserAccountService;
import ILoginData = app.domain.accounts.ILoginData;
import loginData = app.domain.accounts.loginData;
import Message = app.domain.common.Message;

module app.controllers.accounts {
    'use strict';

    export interface ILoginCtrlScope extends ng.IScope {
        message: app.domain.common.IMessage;
    }

    export class LoginCtrl {
        //Dont need these as declared private and useable - it's overkill and # code
        //private _$scope: ILoginCtrlScope;
        //private _$location: ng.ILocationService;
        //private _userAccountService: IUserAccountService;
        //private _loginData: ILoginData;

        static $inject = ['$scope', '$location', 'userAccountService'];

        constructor(
            private $scope: any,
            private $location: ng.ILocationService,
            private userAccountService: IUserAccountService) {

            this.$scope.loginData = new loginData("", "", false);
            this.$scope.message = new Message(false, "");
        }

        logIn = (): void => {
            var self = this;

            self.userAccountService.logInUser(self.$scope.loginData)
                .then((response) => {
                    self.$scope.Global.userIsAuthenticated = true;
                    this.$scope.loginData.IsUserLoggedIn = true;
                    self.$location.path('/');
                }, (error) => {
                    if (error.data != null) {
                        var errorDescription = error.data.error_description;

                        self.$scope.message.Success = false;
                        self.$scope.message.Description = errorDescription;
                    }
                });
        }
    }
    angular
        .module('sampleAngularApp')
        .controller('loginCtrl', app.controllers.accounts.LoginCtrl);
}