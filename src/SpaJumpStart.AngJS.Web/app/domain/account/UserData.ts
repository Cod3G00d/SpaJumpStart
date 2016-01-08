module app.domain.account {
    'use strict';

    export class UserData implements IUserData {
        Username: string;
        Password: string;
        constructor(username: string, password: string) {
            this.Username = username;
            this.Password = password;
        }
    }
}