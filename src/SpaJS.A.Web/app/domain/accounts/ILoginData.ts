///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />

module app.domain.accounts {
    'use strict';

    export interface ILoginData {
        Username: string;
        Password: string;
        IsUserLoggedIn: boolean;
    }
}