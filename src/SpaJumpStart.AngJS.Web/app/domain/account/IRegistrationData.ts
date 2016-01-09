module app.domain.account {
    'use strict';

    export interface IRegistrationData {
        FirstName: string;
        Surname: string;
        Email: string;
        UserName: string;
        Password: string;
    }
}