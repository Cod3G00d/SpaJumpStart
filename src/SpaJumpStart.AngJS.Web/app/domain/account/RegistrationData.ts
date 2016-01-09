///<reference path="../../../Scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="IRegistrationData.ts"/>

module app.domain.account {
    'use strict';

    export class RegistrationData implements app.domain.account.IRegistrationData {
        FirstName: string;
        Surname: string;
        Email: string;
        UserName: string;
        Password: string;

        constructor(firstName: string, surname: string, email: string, username: string, password: string) {
            this.FirstName = firstName;
            this.Surname = surname;
            this.Email = email;
            this.UserName = username;
            this.Password = password;
        }
    }
}