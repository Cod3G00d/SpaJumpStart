///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />

module app.domain.accounts {
    'use strict';

    export interface IRegistrationData {
        FirstName: string;
        Surname: string;
        Email: string;
        UserName: string;
        Password: string;
        ConfirmPassword: string;
    }
}