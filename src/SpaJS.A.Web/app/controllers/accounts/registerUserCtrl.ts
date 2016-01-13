///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../services/accounts/IUserAccountService.ts" />
///<reference path="../../domain/accounts/IRegistrationData.ts" />
///<reference path="../../domain/accounts/RegistrationData.ts" />
///<reference path="../../domain/common/IMessage.ts" />
///<reference path="../../domain/common/Message.ts" />

module app.controllers.accounts {
    'use strict'

    import IRegistrationData = app.domain.accounts.IRegistrationData;
    import IUserAccountService = app.services.accounts.IUserAccountService;
    import IMessage = app.domain.common.IMessage;
    import Message = app.domain.common.Message;
    import registrationData = app.domain.accounts.registrationData;

    export interface IRegisterUserCtrlScope extends ng.IScope {
        savedSuccessfully: boolean;
        message: app.domain.common.IMessage;
        registrationData: IRegistrationData;
    }

    export class RegisterUserCtrl {

        static $inject = ['$scope', '$location', '$timeout', 'userAccountService'];

        constructor(
            private $scope: app.controllers.accounts.IRegisterUserCtrlScope,
            private $location: ng.ILocationService,
            private $timeout: ng.ITimeoutService,
            private userAccountService: IUserAccountService) {

            this.$scope.savedSuccessfully = false;
            this.$scope.message = new Message(false, "");

            this.$scope.registrationData = new registrationData("", "", "", "", "", "");
        }

        private _getUserData = (): IRegistrationData => {
            var self = this;

            var userData = self.$scope.registrationData;
            //if (userData.ConfirmPassword == "" && userData.Password != "") {
                userData.ConfirmPassword = userData.Password;
            //}
            if (userData.UserName == "" && userData.Email != "") {
                userData.UserName = userData.Email;
            }
            return userData;
        } 

        register = (): void => {
            var self = this;

            var data = this._getUserData();

            self.userAccountService.registerUser(data)
                .then((response) => {
                    self.$scope.savedSuccessfully = true;
                    self.$scope.message = new Message(true, "Registered successfully, you will be redicted to login page shortly");
                    self.startTimer();
                }, (errorRes) => {
                    var errors: any[];
                    for (var key in errorRes.data) {
                        for (var i = 0; i < errorRes.data.modelState[key].length; i++) {
                            errors.push(errorRes.data.modelState[key][i]);
                        }
                    }

                    self.$scope.message = new Message(false, "Failed to register user : " + errors.join(' '))
                });
        }

        private startTimer = (): void => {
            var self = this;

            var timer = self.$timeout(function () {
                self.$timeout.cancel(timer);
                self.$location.path('/Account/Login');
            }, 2000);
        }
    }
    angular.module('sampleAngularApp')
        .controller('registerUserCtrl', app.controllers.accounts.RegisterUserCtrl);
}
