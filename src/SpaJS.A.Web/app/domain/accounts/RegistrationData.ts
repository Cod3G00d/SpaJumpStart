///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="IRegistrationData.ts"/>

module app.domain.accounts {
    'use strict';

    export class registrationData implements app.domain.accounts.IRegistrationData {
        FirstName: string;
        Surname: string;
        Email: string;
        UserName: string;
        Password: string;
        ConfirmPassword: string;

        constructor(firstName: string, surname: string, email: string, username: string, password: string, confirmPassword: string) {
            this.FirstName = firstName;
            this.Surname = surname;
            this.Email = email;
            this.UserName = username;
            this.Password = password;
            this.ConfirmPassword = confirmPassword;
        }
    }
}