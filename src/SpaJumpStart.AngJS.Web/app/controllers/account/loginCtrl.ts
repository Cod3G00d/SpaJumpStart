module app.controllers.account {
    'use strict';

    angular.module('sampleAngularApp')
        .controller('LoginCtrl', app.controllers.account.LoginCtrl);

    export class LoginCtrl {
        private _$scope: any; //ng.IScope;
        private _$location: ng.ILocationService;
        private _userAccountService: app.common.services.IUserAccountService;
        private _userData: app.domain.account.IUserData;

        static $inject = ['$scope', '$location', 'UserAccountService'];

        constructor(
            public $scope: ng.IScope,
            private location: ng.ILocationService,
            private userAccountService: app.common.services.IUserAccountService)
        {
            this._$scope = <any> $scope;
            this._userData = new app.domain.account.UserData("","");
        }

        login(): void {
            var self = this;

            self._userAccountService.logInUser(self._userData)
                .then((response) => {
                    self._$scope.Global.isAuthenticated = true;
                    self._$location.path('/');
                }, (data) => {
                    self._$scope.message = data.error_description;
                });
        }
    }
}