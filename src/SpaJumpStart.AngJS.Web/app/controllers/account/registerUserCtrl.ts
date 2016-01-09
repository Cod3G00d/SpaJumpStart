module app.controllers.account {
    'use strict'

    angular.module('sampleAngularApp')
        .controller('RegisterUserCtrl', app.controllers.account.RegisterUserCtrl);

    export interface IRegisterUserCtrlScope extends ng.IScope {
        savedSuccessfully: boolean;
        message: app.domain.IMessage;
        registrationData: app.domain.account.IRegistrationData;
    }

    export class RegisterUserCtrl {
        private _$scope: IRegisterUserCtrlScope;
        private _$location: ng.ILocationService;
        //private _$timeout: ng.ITimeoutService;
        private _userAccountService: app.common.services.IUserAccountService;

        static $inject = ['$scope', '$location', '$timeout',, 'UserAccountService'];

        constructor(
            private $scope: app.controllers.account.IRegisterUserCtrlScope,
            private $location: ng.ILocationService,
            private $timeout: ng.ITimeoutService,
            private userAccountService: app.common.services.IUserAccountService) {

            this._$scope = $scope;
            this._$location = $location;
            this._userAccountService = userAccountService;
            //this._$timeout = $timeout;

            this._$scope.savedSuccessfully = false;
            this._$scope.message = new app.domain.Message(false, "");

            this._$scope.registrationData = new app.domain.account.RegistrationData("", "", "", "", "");
        }

        register(): void {
            var self = this;

            var data = self._$scope.registrationData;

            self._userAccountService.registerUser(data)
                .then((response) => {
                    self._$scope.savedSuccessfully = true;
                    self._$scope.message = new app.domain.Message(true, "Registered successfully, you will be redicted to login page shortly");
                    self.startTimer();
                }, (errorRes) => {
                    var errors: any[];
                    for (var key in errorRes.data) {
                        for (var i = 0; i < errorRes.data.modelState[key].length; i++) {
                            errors.push(errorRes.data.modelState[key][i]);
                        }
                    }

                    self._$scope.message = new app.domain.Message(false, "Failed to register user : " + errors.join(' '))
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
}
