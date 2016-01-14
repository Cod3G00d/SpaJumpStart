var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var global;
        (function (global) {
            var GlobalCtrl = (function () {
                function GlobalCtrl($scope, $location, userAccountService) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$location = $location;
                    this.userAccountService = userAccountService;
                    this._onLoaded = function () {
                        _this.$scope.$broadcast('viewContentLoadComplete');
                    };
                    this._onLoadComplete = function () {
                    };
                    $scope.$on('$viewContentLoaded', this._onLoaded);
                    $scope.$on('viewContentLoadComplete', this._onLoadComplete);
                    $scope.Global = {
                        logOut: function () {
                            userAccountService.logOutUser();
                            $scope.Global.isAuthenticated = false;
                            $location.path('/Account/Login');
                        },
                        isAuthenticated: userAccountService.userIsAuthenticated()
                    };
                }
                GlobalCtrl.Sinject = ['$scope', '$location', 'userAccountService'];
                return GlobalCtrl;
            })();
            global.GlobalCtrl = GlobalCtrl;
        })(global = controllers.global || (controllers.global = {}));
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
angular
    .module('sampleAngularApp')
    .controller('globalCtrl', app.controllers.global.GlobalCtrl);
