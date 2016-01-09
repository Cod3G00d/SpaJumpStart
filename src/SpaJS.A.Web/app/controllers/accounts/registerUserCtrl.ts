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

    export interface IRegisterUserCtrlScope extends ng.IScope {
        savedSuccessfully: boolean;
        message: app.domain.common.IMessage;
        registrationData: app.domain.accounts.IRegistrationData;
    }

    export class RegisterUserCtrl {
        private _$scope: IRegisterUserCtrlScope;
        private _$location: ng.ILocationService;
        //private _$timeout: ng.ITimeoutService;
        private _userAccountService: app.services.accounts.IUserAccountService;

        static $inject = ['$scope', '$location', '$timeout', 'UserAccountService'];

        constructor(
            private $scope: app.controllers.accounts.IRegisterUserCtrlScope,
            private $location: ng.ILocationService,
            private $timeout: ng.ITimeoutService,
            private userAccountService: app.services.accounts.IUserAccountService) {

            this._$scope = $scope;
            this._$location = $location;
            this._userAccountService = userAccountService;
            //this._$timeout = $timeout;

            this._$scope.savedSuccessfully = false;
            this._$scope.message = new app.domain.common.Message(false, "");

            this._$scope.registrationData = new app.domain.accounts.registrationData("", "", "", "", "");
        }

        register(): void {
            var self = this;

            var data = self._$scope.registrationData;

            self._userAccountService.registerUser(data)
                .then((response) => {
                    self._$scope.savedSuccessfully = true;
                    self._$scope.message = new app.domain.common.Message(true, "Registered successfully, you will be redicted to login page shortly");
                    self.startTimer();
                }, (errorRes) => {
                    var errors: any[];
                    for (var key in errorRes.data) {
                        for (var i = 0; i < errorRes.data.modelState[key].length; i++) {
                            errors.push(errorRes.data.modelState[key][i]);
                        }
                    }

                    self._$scope.message = new app.domain.common.Message(false, "Failed to register user : " + errors.join(' '))
                });
        }

        private startTimer(): void {
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
