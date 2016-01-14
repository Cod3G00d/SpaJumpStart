///<reference path="../../../Scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="IRegistrationData.ts"/>
var app;
(function (app) {
    var domain;
    (function (domain) {
        var account;
        (function (account) {
            'use strict';
            var RegistrationData = (function () {
                function RegistrationData(firstName, surname, email, username, password) {
                    this.FirstName = firstName;
                    this.Surname = surname;
                    this.Email = email;
                    this.UserName = username;
                    this.Password = password;
                }
                return RegistrationData;
            })();
            account.RegistrationData = RegistrationData;
        })(account = domain.account || (domain.account = {}));
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=RegistrationData.js.map