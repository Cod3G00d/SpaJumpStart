var app;
(function (app) {
    var domain;
    (function (domain) {
        var accounts;
        (function (accounts) {
            'use strict';
            var registrationData = (function () {
                function registrationData(firstName, surname, email, username, password, confirmPassword) {
                    this.FirstName = firstName;
                    this.Surname = surname;
                    this.Email = email;
                    this.UserName = username;
                    this.Password = password;
                    this.ConfirmPassword = confirmPassword;
                }
                return registrationData;
            })();
            accounts.registrationData = registrationData;
        })(accounts = domain.accounts || (domain.accounts = {}));
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
