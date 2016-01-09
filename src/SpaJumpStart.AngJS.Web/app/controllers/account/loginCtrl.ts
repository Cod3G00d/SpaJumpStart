module app.controllers.account {
    'use strict';

    angular.module('sampleAngularApp')
        .controller('LoginCtrl', app.controllers.account.LoginCtrl);

    export interface ILoginCtrlScope extends ng.IScope {
        message: string;
    }

    export class LoginCtrl {
        private _$scope: ILoginCtrlScope;
        private _$location: ng.ILocationService;
        private _userAccountService: app.common.services.IUserAccountService;
        private _userData: app.domain.account.IUserData;

        static $inject = ['$scope', '$location', 'UserAccountService'];

        constructor(
            public $scope: any,
            private $location: ng.ILocationService,
            private userAccountService: app.common.services.IUserAccountService)
        {
            this._$scope = <any> $scope;
            this._userData = new app.domain.account.UserData("","");
        }

        login(): void {
            var self = this;

            self._userAccountService.logInUser(self._userData)
                .then((response) => {
                    self.$scope.Global.userIsAuthenticated = true;
                    self._$location.path('/');
                }, (data) => {
                    self._$scope.message = data.error_description;
                });
        }
    }
}