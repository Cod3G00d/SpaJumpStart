///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="ILoginData.ts" />

module app.domain.accounts {
    'use strict';

    export class loginData implements ILoginData {
        Username: string;
        Password: string;
        IsUserLoggedIn: boolean;

        constructor(username: string, password: string, isUserLoggedIn: boolean  = false) {
            this.Username = username;
            this.Password = password;
            this.IsUserLoggedIn = false;
        }
    }

}