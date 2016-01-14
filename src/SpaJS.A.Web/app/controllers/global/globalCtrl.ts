///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />

module app.controllers.global {

    export class GlobalCtrl {

        static Sinject = ['$scope', '$location', 'userAccountService'];

        constructor(
            private $scope: any,
            private $location: ng.ILocationService, 
            private userAccountService: app.services.accounts.IUserAccountService) {

            $scope.$on('$viewContentLoaded', this._onLoaded);
            $scope.$on('viewContentLoadComplete', this._onLoadComplete);

            $scope.Global = {
                logOut: () => {
                    userAccountService.logOutUser();
                    $scope.Global.isAuthenticated = false;
                    $location.path('/Account/Login');
                },
                isAuthenticated: userAccountService.userIsAuthenticated()
            }
        }

        private _onLoaded = (): void => {
            this.$scope.$broadcast('viewContentLoadComplete');
        }
        private _onLoadComplete = (): void => {
        }

        //private _logOut(): void {
        //    this.userAccountService.logOutUser();
        //    this.$scope.Global.isAuthenticated = false;
        //    this.$location.path('/Account/Login');
        //}
    }

}
//register the service module with angularjs
angular
    .module('sampleAngularApp')
    .controller('globalCtrl', app.controllers.global.GlobalCtrl);