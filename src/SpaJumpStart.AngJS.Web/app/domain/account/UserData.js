var app;
(function (app) {
    var domain;
    (function (domain) {
        var account;
        (function (account) {
            'use strict';
            var UserData = (function () {
                function UserData(username, password) {
                    this.Username = username;
                    this.Password = password;
                }
                return UserData;
            })();
            account.UserData = UserData;
        })(account = domain.account || (domain.account = {}));
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=UserData.js.map