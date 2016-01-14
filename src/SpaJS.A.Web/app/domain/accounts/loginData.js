var app;
(function (app) {
    var domain;
    (function (domain) {
        var accounts;
        (function (accounts) {
            'use strict';
            var loginData = (function () {
                function loginData(username, password, isUserLoggedIn) {
                    if (isUserLoggedIn === void 0) { isUserLoggedIn = false; }
                    this.Username = username;
                    this.Password = password;
                    this.IsUserLoggedIn = false;
                }
                return loginData;
            })();
            accounts.loginData = loginData;
        })(accounts = domain.accounts || (domain.accounts = {}));
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
